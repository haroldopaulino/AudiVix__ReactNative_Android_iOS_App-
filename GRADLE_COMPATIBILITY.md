# Gradle 9.8.1 migration (experimental)

**Owner:** Haroldo Paulino

- Gradle wrapper distribution: 9.8.1
- Kotlin Gradle plugin: 2.4.10
- Android Gradle plugin: 9.0.1
- React Native: 0.82.1 (the included Gradle plugin remains the matching React Native version)
- JVM: 17 or higher supported by Gradle; use JDK 17 for Android compatibility.

The postinstall script aligns the Kotlin and AGP versions in the npm-installed React Native version catalog. This fixes the known Kotlin metadata mismatch seen when Gradle 9.8.1 libraries were compiled using Kotlin 2.1.20. It is an experimental migration, not a verified Android build. Further dependency incompatibilities may arise.

Run `npm install` then `cd android && ./gradlew --version && ./gradlew clean assembleRelease`. Do not use a globally installed Gradle binary for this project. If a Gradle wrapper JAR is missing, generate the wrapper using a known working Gradle 8 installation and then use the included Gradle 9.8.1 wrapper properties.
