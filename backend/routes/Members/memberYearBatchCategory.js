const express = require('express');
const router = express.Router();
const memberYearBatchCategoryController = require('../../../controllers/Members/MemberYearBatchController');

router.post('/createMemberYearBatch', memberYearBatchCategoryController.createCategory);
router.get('/getAllMemberYearBatch', memberYearBatchCategoryController.getAllCategories);
router.get('/getMemberYearBatch/:memberYearBatchId', memberYearBatchCategoryController.getCategoryById);
router.put('/updateMemberYearBatch/:memberYearBatchId', memberYearBatchCategoryController.updateCategory);
router.delete('/deleteMemberYearBatch/:memberYearBatchId', memberYearBatchCategoryController.deleteCategory);

module.exports = router;