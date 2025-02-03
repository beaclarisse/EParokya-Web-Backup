const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const user = require('./routes/user')

const wedding = require('./routes/wedding')
const baptism = require('./routes/Binyag')
const funeral = require('./routes/Funeral')

const counseling = require('./routes/counseling')
const prayerWall = require('./routes/PrayerWall/prayerWall')
const prayerRequest = require('./routes/PrayerWall/prayerRequest')

const houseBlessing = require('./routes/PrivateScheduling/houseBlessing')
// const memberBatchYear = require('./routes/Members/memberBatchYear')
const resourceCategory = require('./routes/Resources/resourceCategory')
const resource = require('./routes/Resources/resource')


const adminDate = require('./routes/adminDate')
const customEvent = require('./routes/customEvent')

const ministryCategory = require('./routes/ministryCategory')
const announcement = require('./routes/Announcement/announcement')
const announcementCategory = require('./routes/Announcement/announcementCategory')
const announcementComment = require('./routes/Announcement/announcementComment')


const post = require('./routes/post')
// const evenpost = require('./routes/EventPost')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true}))
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());

// app.get('/order',(req, res) => {
//     res.send('GUMANA NAA')
// })
app.use('/api/v1', user);
app.use('/api/v1', wedding);
app.use('/api/v1', post);
// app.use('/api/v1', evenpost);
app.use('/api/v1', baptism);
app.use('/api/v1', funeral);
app.use('/api/v1', prayerWall);

app.use('/api/v1', adminDate);
app.use('/api/v1', customEvent);
app.use('/api/v1', ministryCategory);
app.use('/api/v1', announcementCategory);
app.use('/api/v1', announcement);
app.use('/api/v1', announcementComment);
app.use('/api/v1', counseling);
app.use('/api/v1', prayerRequest);
app.use('/api/v1', houseBlessing);
app.use('/api/v1', resourceCategory);
app.use('/api/v1', resource);





module.exports = app