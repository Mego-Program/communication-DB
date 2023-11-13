const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ShmuelRoth:<password>@cluster0.gbn9blz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Other database configuration code...
