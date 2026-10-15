# Android dependency warning handling

**Owner:** Haroldo Paulino

The five dependency Android manifests have their obsolete `package` attributes removed after installation. Namespace declarations remain in the dependency Gradle configurations.

The Kotlin deprecation and deprecated-override diagnostics in Track Player, Video, and Safe Area Context are silenced using per-file Kotlin `@file:Suppress` annotations on the installed third-party sources. No media APIs, method bodies, or playback code are changed for warning handling. The original dependency implementation remains deprecated and will need upstream upgrades when compatible releases become available.

Java compiler notices for the selected dependencies are suppressed using `-nowarn` on their JavaCompile tasks. This intentionally reduces diagnostic visibility in dependency code, not application code; it is not a migration to non-deprecated APIs.

The patch runs automatically after `npm install`, and again before the included release build script. It is idempotent and preserves the separate Track Player compatibility fixes. A complete Gradle build must be performed on the Android development machine.
