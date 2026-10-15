# Gradle 9.8.1 / Kotlin 2.4.10 integration

**Owner:** Haroldo Paulino

The React Native 0.82.1 bundled Gradle plugin may request Kotlin API version 1.8 in `build.gradle.kts`, which is rejected by Kotlin 2.4.10. `npm install` now updates those plugin build scripts to Kotlin API 2.0, in addition to aligning the plugin version catalog.

After replacing the project files:

```bash
cd ~/Downloads/AudiVix_ReactNative
npm install
cd android
./gradlew --stop
./gradlew clean assembleRelease
```

Use the project wrapper (`./gradlew`), **not** the globally installed `gradle wrapper` command. Gradle 9.8.1's Kotlin/API compatibility with all the native dependencies is not yet validated by a complete device build.
