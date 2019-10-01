# 3.1.0
- [x] remove validator and dependencies joi, @types/joi, deepmerge, tsdv-joi (moved to iris-back)

# 3.0.2
- [x] fix : @BusinessValidator now merge existing schema with new.

# 3.0.1
- [x] move dependencies (joi, @types/joi, deepmerge, reflect-metadata, tsdv-joi) to peerDependencies

# 3.0.0
- [x] IrisException : Rename erreurs -> errors
- [x] Rename ErreurDO -> ErrorDO and rename fields libelleErreur -> label, codeErreur -> code, champErreur -> field
- [x] ErrorDO : Add extra fields path, value and limit
- [x] Remove Joi validation without @BusinessValidator() decorator

# 2.0.1
- [x] Override IrisException message by including all libelleErreur of erreurs
- [x] Allow unknown fields when validating with joi

# 2.0.0
- [x] Migrate module to Typescript
- [x] Add Joi validation by decorators

# 1.0.10
- [x] Add check Joi function
- [x] Update version
- [x] Add release notes
