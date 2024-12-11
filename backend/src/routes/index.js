const RoleRouter = require('./RoleRouter')
const UsersRouter = require('./UsersRouter')
const MessageRouter = require('./MessageRouter')
const FileUpLoadRouter = require('./FileUploadRouter')
const ProvincesRouter = require('./ProvincesRouter')
const DistrictsRouter = require('./DistrictsRouter')
const WardsRouter = require('./WardsRouter')
const LocationSampleRouter = require('./LocationSampleRouter')
const ConservationStatusRouter = require('./ConservationStatusRouter')
const GroupOfOrganismsRouter = require('./GroupOfOrganismsRouter')
const GenusRouter = require('./GenusRouter');
const FamilyRouter = require('./FamilyRouter');
const OrderRouter = require('./OrderRouter');
const ClassRouter = require('./ClassRouter');
const PhylumRouter = require('./PhylumRouter')
const KingdomRouter = require('./KingdomRouter')
const OrganismRouter = require('./OrganismRouter')
const SampleRouter = require('./SampleRouter')
const MapRouter = require('./MapRouter')
const IdentificationRouter = require('./IdentificationRouter')
// const routes = (app) => {
//     app.use('/api/role', RoleRouter);
//     app.use('/api/users', UsersRouter);
//     app.use('/api/message', MessageRouter);
//     app.use('/api/fileupload', FileUpLoadRouter);
//     app.use('/api/provinces', ProvincesRouter);
//     app.use('/api/districts', DistrictsRouter);
//     app.use('/api/wards', WardsRouter);
//     app.use('/api/locationsample', LocationSampleRouter);
//     app.use('/api/conservationstatus', ConservationStatusRouter);
//     app.use('/api/groupoforganisms', GroupOfOrganismsRouter);
//     app.use('/api/genus', GenusRouter);
//     app.use('/api/family', FamilyRouter);
//     app.use('/api/order', OrderRouter);
//     app.use('/api/class', ClassRouter);
//     app.use('/api/phylum', PhylumRouter);
//     app.use('/api/kingdom', KingdomRouter);
//     app.use('/api/organism', OrganismRouter);
// }
// module.exports = routes

const routes = (app) => {
    const routers = {
        '/api/role': RoleRouter,
        '/api/users': UsersRouter,
        '/api/message': MessageRouter,
        '/api/fileupload': FileUpLoadRouter,
        '/api/provinces': ProvincesRouter,
        '/api/districts': DistrictsRouter,
        '/api/wards': WardsRouter,
        '/api/locationsample': LocationSampleRouter,
        '/api/conservationstatus': ConservationStatusRouter,
        '/api/groupoforganisms': GroupOfOrganismsRouter,
        '/api/genus': GenusRouter,
        '/api/family': FamilyRouter,
        '/api/order': OrderRouter,
        '/api/class': ClassRouter,
        '/api/phylum': PhylumRouter,
        '/api/kingdom': KingdomRouter,
        '/api/organism': OrganismRouter,
        '/api/sample': SampleRouter,
        '/api/map': MapRouter,
        '/api/identification': IdentificationRouter,
    };

    // Kiểm tra từng router
    for (const [path, router] of Object.entries(routers)) {
        if (typeof router === 'function' || (typeof router === 'object' && router.stack)) {
            console.log(`Mounting router for ${path}`);
            app.use(path, router);
        } else {
            console.error(`Invalid middleware for ${path}:`, router);
        }
    }
};
module.exports = routes;