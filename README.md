# AudiVix React Native Streaming App

**Cross-platform audio and video streaming application built with React Native, TypeScript, Android and iOS native shells, offline media downloads, reusable media UI, and private-backend-ready architecture.**

AudiVix is a React Native implementation of the AudiVix media platform, matching the same product direction as the native Android/AOSP version while targeting both Android and iOS from a shared TypeScript codebase. The project is designed as a modern streaming app with audio playback, video playback, offline downloads, settings, and a product-style media browsing experience.

This repository demonstrates practical cross-platform mobile engineering: React Native architecture, native Android/iOS integration, shared UI logic, media playback, filesystem-backed offline downloads, and platform-aware build configuration.

<img width="1122" height="1402" alt="audivix_react_native_1" src="https://github.com/user-attachments/assets/8364f88b-803f-41b3-afe8-c576907f6dab" />

---

## Why This Project Matters

AudiVix is more than a sample React Native app. It is a product-oriented cross-platform streaming project that shows how to build one media experience for Android and iOS while preserving native project support.

This project demonstrates:

- React Native cross-platform development
- TypeScript application development
- Shared Android and iOS product implementation
- Audio and video streaming workflows
- Offline media download support
- Filesystem-based media persistence
- React Native Track Player integration
- React Native Video integration
- Async storage for persisted app settings/state
- Platform-aware Android build configuration
- iOS CocoaPods integration
- UI parity work against an existing native Android app
- Private-backend-ready media architecture
- Modern React Native 0.82.x project structure

---

## Project Overview

AudiVix is the React Native version of the AudiVix media app. It is intended to provide the same overall product direction as the Android/AOSP implementation, but through a shared JavaScript/TypeScript codebase.

The repository contains:

| Area | Purpose |
|---|---|
| `src/` | Shared React Native application code |
| `android/` | Native Android host project |
| `ios/` | Native iOS host project |
| `legacy-wearable/` | Preserved legacy wearable-related code from the original project |
| `scripts/` | Build, compatibility, and patching support scripts |

The root repo also includes Android build compatibility notes and UI parity notes, showing ongoing effort to keep the React Native implementation aligned with the native Android experience.

---

## Main Features

### Cross-Platform Audio and Video App

AudiVix is built to support both audio and video media consumption through one React Native codebase.

This makes it useful as a portfolio example for:

- Media apps
- Streaming apps
- Subscription/content platforms
- Private enterprise media catalogs
- Cross-platform product development

### Offline Media Downloads

The current project README documents offline audio/video download support. Users can enable offline downloads in Settings, download catalog items, and play saved files from the Offline area. Downloads are stored in private document storage, can be canceled while in progress, and can be removed when no longer needed.

This is an especially strong portfolio feature because offline support is a real product capability, not just a UI demo.

### Shared React Native UI

The repo includes UI-parity notes showing the React Native app was updated to match the Android native UI direction, including:

- Promotional home banner
- Two-option Audio/Video selector
- Darker violet palette
- Compact artwork/media cards
- Play button on media cards
- Overflow menu for reorder/download functions
- Home/Settings bottom navigation

The parity notes also say that playback, playlist, offline, player, and settings implementations remain in the project and are reachable through the related media controls.

### Audio Playback Stack

The project uses `react-native-track-player` for audio-related playback workflows and includes a postinstall compatibility patch specifically for the Track Player Android integration.

This shows practical experience with real media libraries rather than only static front-end UI.

### Video Playback Stack

The project uses `react-native-video` for video playback support, which is appropriate for streaming and local/offline video scenarios.

### Persisted Storage and State

The dependency list includes:

- `@react-native-async-storage/async-storage`
- `react-native-fs`

These support app-state persistence and file-backed offline media behavior.

### Android and iOS Native Project Support

This repository includes both Android and iOS native project folders in addition to the shared React Native source. The iOS side uses CocoaPods workflow support, and the Android side includes Gradle and autolinking-related setup notes.

### Android Package Identity and CLI Validation

The README documents the Android package identity as `com.audivix` and includes validation steps to confirm React Native CLI platform detection before compiling the Android project.

This kind of detail is valuable to employers because it shows experience solving real React Native Android build and autolinking issues.

---

## Technical Stack

| Area | Technology |
|---|---|
| Cross-platform framework | React Native 0.82.1 |
| Language | TypeScript |
| UI runtime | React 19.1.1 |
| Android host | Native Android project |
| iOS host | Native iOS project |
| Audio playback | react-native-track-player |
| Video playback | react-native-video |
| Local file access | react-native-fs |
| Local persisted storage | AsyncStorage |
| Layout safety | react-native-safe-area-context |
| Build tooling | Babel, Metro, TypeScript |
| Testing | Jest, react-test-renderer |
| Android CLI support | @react-native-community/cli |
| iOS package management | CocoaPods |
| License | GPL-3.0 |

---

## Repository Structure

```text
AudiVix__ReactNative_Android_iOS_App-/
├── android/
├── ios/
├── legacy-wearable/
├── scripts/
├── src/
├── AGP9_COMPATIBILITY.md
├── BUILD_WARNING_STATUS.md
├── GRADLE_9_8_1.md
├── GRADLE_COMPATIBILITY.md
├── UI_PARITY.md
├── WARNING_FIXES.md
├── app.json
├── babel.config.js
├── index.js
├── metro.config.js
├── package.json
├── react-native.config.js
├── tsconfig.json
├── README.md
└── LICENSE
```

---

## Architecture Direction

AudiVix uses a typical React Native architecture direction:

```text
Shared TypeScript app logic and UI
                ↓
React Native bridge / libraries
                ↓
Native Android host project
Native iOS host project
                ↓
Platform media playback and file storage capabilities
```

This allows the product UI and much of the app behavior to remain shared, while still relying on the native mobile platforms for media playback, files, and platform-specific build behavior.

---

## Media Workflow

A typical product flow looks like this:

```text
User opens AudiVix
      ↓
User browses audio or video content
      ↓
User plays content immediately
      ↓
Optional: user downloads content for offline playback
      ↓
Media is saved into app-private storage
      ↓
User opens Offline section
      ↓
Saved audio/video is played locally
```

This is a production-relevant flow for streaming and content apps.

---

## Android Build Notes

The current repo README states:

- Android may need a generated Gradle wrapper if missing.
- The Android package identity is expected to be `com.audivix`.
- There are explicit instructions for verifying React Native CLI platform detection.
- The project includes autolinking fallback and compatibility scripts.
- A postinstall patch handles Track Player Android Kotlin compatibility.

This is strong evidence of hands-on Android React Native integration work.

---

## iOS Build Notes

The current repo README also notes that the iOS side uses CocoaPods (`bundle install` and `bundle exec pod install`) and includes an iOS Xcode project, although the native iOS project has not yet been fully validated in Xcode in the documented environment.

That makes this repository a realistic example of cross-platform engineering in progress, including the native setup work needed to keep Android and iOS aligned.

---

## Relationship to the Native Android/AOSP AudiVix App

This repository represents the React Native version of the AudiVix app. It follows the same product direction as the native Android/AOSP AudiVix project: a media streaming application with audio/video support, settings, offline features, and a branded content-browsing experience.

That relationship makes this repo especially valuable because it shows:

- Cross-platform product translation
- UI parity effort against a native implementation
- Shared product thinking across frameworks
- The ability to compare native and React Native implementation strategies

---

## Skills Demonstrated

This repository demonstrates several cross-platform and mobile engineering skills:

- React Native app development
- TypeScript development
- Shared Android/iOS codebase design
- Native Android host integration
- Native iOS host integration
- Audio playback integration
- Video playback integration
- Offline download workflow design
- Async storage usage
- Filesystem-backed local media storage
- React Native CLI platform configuration
- Android autolinking troubleshooting
- Gradle compatibility handling
- CocoaPods workflow familiarity
- UI parity implementation against a native Android app
- Product-oriented mobile architecture

---

## How to Run

### Prerequisites

The current repo README lists the following prerequisites:

- Node.js 20.19.4+
- JDK 17
- Android Studio and Android SDK
- Xcode and CocoaPods on macOS for iOS

### Install

```bash
npm install
```

### Android

If needed, generate the wrapper:

```bash
cd android
gradle wrapper --gradle-version 8.14.3
cd ..
```

Then run:

```bash
npm run android
```

### iOS

On macOS:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Then open the generated Xcode workspace and run the iOS app.

The repo README notes that native installation and validation are still outstanding in the documented environment, so physical validation may still be needed on your machine.

---

## Owner

by Haroldo Paulino

---

## License

This project is licensed under the GPL-3.0 license.
