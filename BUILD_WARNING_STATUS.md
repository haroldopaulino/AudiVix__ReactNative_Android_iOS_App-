# AudiVix Gradle 9.8.1 build warning status

**Owner:** Haroldo Paulino

Gradle remains pinned to 9.8.1. Android Gradle Plugin remains 9.0.1, Kotlin 2.4.10, and React Native 0.82.1.

## Addressed diagnostics

- Kotlin diagnostics in react-native-video for unnecessary safe calls and redundant Elvis expressions are suppressed at dependency source level by an idempotent post-install patch. The code is unchanged.
- Java compiler deprecation / unchecked notes in react-native-video, react-native-fs, Async Storage and Slider are disabled for those modules via javac's internal `-XDsuppressNotes` option and `-nowarn`. This is presentation-only, not an API migration. Because `-XDsuppressNotes` is internal, future JDK updates may invalidate it.
- Previous fixes for AndroidManifest namespace and Kotlin deprecation diagnostics remain.

## Not resolved by this update

- AGP 9 warnings for `android.builtInKotlin=false`, `android.newDsl=false`, and the legacy `org.jetbrains.kotlin.android` plugin remain, since React Native 0.82 native modules need legacy compatibility. Removing these settings without upgrading/migrating those modules would risk breaking the working build.
- Android SDK CXX5304 XML format warning depends on the installed Android command-line tools / NDK; this cannot safely be removed by changing only the project.
- Deprecations in React Native's Gradle plugin (`srcDir`, old LibraryExtension, project.properties) remain.
- Gradle 10 migration deprecations and npm dependency/security notices are separate from the Android build diagnostic changes.

The changes here do not upgrade Gradle or Android dependencies and do not claim to eliminate the underlying deprecated API usage. Full Android compilation has not been run in this environment.
