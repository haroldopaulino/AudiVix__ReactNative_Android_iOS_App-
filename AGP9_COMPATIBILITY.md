# AudiVix Gradle 9.8.1 / AGP 9.0.1 compatibility

**Owner:** Haroldo Paulino

The project uses Gradle 9.8.1 and Android Gradle Plugin 9.0.1 with Kotlin Gradle Plugin 2.4.10.

React Native 0.82.1 and several installed Android native modules still apply the Kotlin Android plugin and use the legacy AGP DSL. Until those dependencies are migrated, `android.builtInKotlin=false` and `android.newDsl=false` provide AGP 9 compatibility mode. These flags are temporary migration settings, not a completed built-in Kotlin/AGP DSL upgrade.

Do not run system `gradle wrapper` without an explicit version. Use `./gradlew --version` and `./gradlew clean assembleRelease`, after `npm install`. On machines missing the Gradle wrapper JAR, use `gradle wrapper --gradle-version 9.8.1` to regenerate it.

Full Android build under this configuration must be verified on a machine with Android SDK and dependencies.
