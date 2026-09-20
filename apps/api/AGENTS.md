# Bedrock Chests - The easiest way to create GUI components that emulate chests in Minecraft: Bedrock Edition.

Point of this API is to serve developers an option to fetch dynamically identifiers of Minecraft items, basing of their string identifier (e.g. "minecraft:dirt" is 1).

## Type placement

Do **not** declare `enum`, `interface`, or `type` aliases outside `src/models`.

- Create that directory when adding types if it does not exist yet.
- Implementation files elsewhere must import from `src/models`; they must not grow local public type definitions.
- Each interface, enumeration & type should be in a separate file.

## JSDoc documentation

Document symbols with JSDoc in the style already used in this package.

- Every documented symbol needs both `@summary` and `@description`.
- `@description` must **not** repeat `@summary`. It should add more context (role, behavior, constraints).
