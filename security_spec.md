# Arcana Firebase Security Specification

## Data Invariants
- A `Reading` must have a `userId` that matches the authenticated user.
- Readings are immutable once created (except for deletion by owner).
- `UserProfile` documents can only be read or written by the user themselves.

## The Dirty Dozen (Test Cases)
1. **Unauthenticated Write**: Attempting to create a reading without being signed in (Should fail).
2. **Identity Spoofing**: Signed-in user 'A' trying to create a reading with `userId: 'B'` (Should fail).
3. **Draft Poisoning**: Sending a reading with a 1MB `question` string (Should fail via size limits).
4. **ID Injection**: Using a 2KB string as a reading ID (Should fail via `isValidId()`).
5. **Private Leak**: User 'A' trying to read `/readings/reading_of_B` (Should fail).
6. **Self-Promotion**: User trying to set `isPremium: true` in their profile (Should fail via restricted update keys).
7. **Orphaned Reading**: Creating a reading for a non-existent spread ID (Strictly speaking, we check `spreadId` against known keys).
8. **Impersonation**: Attempting to read `/users/B` as user 'A' (Should fail).
9. **Shadow Field**: Adding a `role: 'admin'` field to a reading doc (Should fail via exact key match).
10. **State Skipping**: Manually setting a future `createdAt` timestamp (Should fail via `request.time` check).
11. **Blanket Read Request**: Requesting `getDocs(collection(db, "readings"))` without a `where("userId", "==", uid)` clause (Should be blocked by rules requiring field-level evaluation).
12. **PII Scraping**: Attempting to list all users to find emails (Should fail as `list` is disabled or strictly filtered).

## Rule Drafting Plan
1. Default Deny.
2. Helper functions for `isSignedIn`, `isVerified`, `isValidId`.
3. Entity validation helpers for `Reading` and `UserProfile`.
4. Specific `match` blocks for `/readings` and `/users`.
