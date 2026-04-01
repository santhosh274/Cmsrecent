# Docker Containerization Fixes - TODO

## Issues Fixed:
- [x] 1. Fix DB_PASSWORD environment variable mismatch in compose.yaml
- [x] 2. Fix frontend VITE_API_BASE_URL to use Docker network (backend:5000)
- [x] 3. Generate proper bcrypt password hashes for seeds.sql
- [x] 4. Add .dockerignore files for smaller images
- [x] 5. Optimize server/Dockerfile with multi-stage builds
- [x] 6. Optimize root Dockerfile with multi-stage builds

## Summary of Changes:
1. **compose.yaml**: Changed `DB_PASSWORD` to `DB_PASS` to match server code, updated `VITE_API_BASE_URL` to `http://backend:5000`
2. **seeds.sql**: Fixed bcrypt password hash (password123 -> $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.rsW/lW3LpMfEqFSP.W), used fixed UUIDs for user references
3. **server/.dockerignore**: Added to exclude unnecessary files from server build
4. **.dockerignore**: Added root-level ignore file
5. **server/Dockerfile**: Optimized with multi-stage builds, non-root user, production dependencies only
6. **Dockerfile**: Optimized with multi-stage builds for frontend

## Test Credentials:
- Email: admin@cms.com, doctor@cms.com, pharmacy@cms.com, lab@cms.com
- Password: password123
