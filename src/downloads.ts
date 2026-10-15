// Owner: Haroldo Paulino
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import {Media} from './types';

export type DownloadRecord={id:string;path:string;title:string;type:string;size:number;completedAt:number;media:Media};
const KEY='audivix_downloads_v1';
const mediaDir=RNFS.DocumentDirectoryPath+'/audivix_media';
let active=new Map<string,{stop:()=>void}>();
export const isDownloading=(id:string)=>active.has(id);
const readIndex=async():Promise<Record<string,DownloadRecord>>=>{try{return JSON.parse((await AsyncStorage.getItem(KEY))||'{}')}catch{return {}}};
const writeIndex=async(index:Record<string,DownloadRecord>)=>AsyncStorage.setItem(KEY,JSON.stringify(index));
export const listDownloads=async()=>{const entries=await readIndex();const valid:Record<string,DownloadRecord>={};for(const [id,record] of Object.entries(entries)){if(await RNFS.exists(record.path))valid[id]=record}if(Object.keys(valid).length!==Object.keys(entries).length)await writeIndex(valid);return valid};
export const resolveMedia=async(item:Media):Promise<Media>=>{const index=await listDownloads();const record=index[item.id];return record?{...item,streamUrl:'file://'+record.path}:item};
export const downloadMedia=async(item:Media,onProgress?:(value:number)=>void):Promise<DownloadRecord>=>{
 if(active.has(item.id))throw Error('Download is already in progress');
 if(!/^https:\/\//i.test(item.streamUrl))throw Error('Offline download requires an HTTPS media URL');
 await RNFS.mkdir(mediaDir);
 const existing=(await listDownloads())[item.id];if(existing)return existing;
 const extension=(()=>{try{const url=item.streamUrl.split('?')[0];const match=url.match(/\.(mp3|m4a|aac|wav|ogg|flac|mp4|m4v|mov|webm)$/i);return match?match[1].toLowerCase():item.type==='audio'?'mp3':'mp4'}catch{return 'bin'}})();
 const safeId=encodeURIComponent(item.id).replace(/%/g,'_');
 const destination=mediaDir+'/'+safeId+'.'+extension;
 const temp=destination+'.part';
 let job:ReturnType<typeof RNFS.downloadFile>|undefined;
 try{
  job=RNFS.downloadFile({fromUrl:item.streamUrl,toFile:temp,background:false,discretionary:false,progressInterval:200,progressDivider:1,progress:({bytesWritten,contentLength})=>onProgress?.(contentLength>0?Math.min(100,Math.round(bytesWritten*100/contentLength)):0)});
  active.set(item.id,{stop:()=>RNFS.stopDownload(job!.jobId)});
  const result=await job.promise;
  if(result.statusCode<200||result.statusCode>=300)throw Error('Download failed: HTTP '+result.statusCode);
  if(result.bytesWritten<=0)throw Error('Downloaded file is empty');
  await RNFS.moveFile(temp,destination);
  const record={id:item.id,title:item.title,type:item.type,path:destination,size:result.bytesWritten,completedAt:Date.now(),media:item};
  const index=await readIndex();index[item.id]=record;await writeIndex(index);onProgress?.(100);return record;
 }catch(e){if(await RNFS.exists(temp))await RNFS.unlink(temp).catch(()=>{});throw e}
 finally{active.delete(item.id)}
};
export const cancelDownload=(id:string)=>{active.get(id)?.stop()};
export const removeDownload=async(id:string)=>{const index=await readIndex();const record=index[id];if(!record)return;if(await RNFS.exists(record.path))await RNFS.unlink(record.path);delete index[id];await writeIndex(index)};
