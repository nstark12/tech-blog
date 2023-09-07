const router = require('express').Router();
const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes');
// const dashboardRoutes = require('./dashboardRoutes')

router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes)
router.use('/', viewRoutes);

module.exports = router;