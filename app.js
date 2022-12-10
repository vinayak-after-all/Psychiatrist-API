const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

const psy1id=101;
const psy2id=102;
const psy3id=103;
const psy4id=104;
const psy5id=105;

const psychiatristCount=5;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB", {
  useNewUrlParser: true
});

const hospitalSchema=
    {
      _id:Number,
      name:String,
      psychiatristCount:String,
      totalPatients:Number,
      psychiatrist_details:{psychiatrist1:
                {
                    _id:String,
                    psy1Name:String,
                    psy1patientCount:Number
                },
      psychiatrist2:
                {
                    _id:String,
                    psy2Name:String,
                    psy2patientCount:Number
                },
      psychiatrist3:
                  {
                    _id:String,
                    psy3Name:String,
                    psy3patientCount:Number
                  },
      psychiatrist4:
                  {
                      _id:String,
                      psy4Name:String,
                      psy4patientCount:Number
                  },
      psychiatrist5:
                  {
                      _id:String,
                      psy5Name:String,
                      psy5patientCount:Number
                  }}
              };


const Hospital = mongoose.model("Hospital", hospitalSchema);

app.get("/",function(req,res){
  res.render("home");
});

////////// request all articles
app.route("/hospitals")
  .get(function(req, res) {
    Hospital.find(function(err, foundHospitals) {
      if (!err) {
        res.send(foundHospitals);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {

    const newHospital = new Hospital({
      _id:req.body._id,
      name:req.body.name,
      psychiatristCount:psychiatristCount,
      totalPatients:req.body.totalPatients,
      psychiatrist_details:{          psychiatrist1:
                          {
                              _id:psy1id,
                              psy1Name:req.body.psy1Name,
                              psy1patientCount:req.body.psy1patientCount
                          },

                psychiatrist2:
                          {
                              _id:psy2id,
                              psy2Name:req.body.psy2Name,
                              psy2patientCount:req.body.psy2patientCount
                          },
                psychiatrist3:
                            {
                              _id:psy3id,
                              psy3Name:req.body.psy3Name,
                              psy3patientCount:req.body.psy3patientCount
                            },
                psychiatrist4:
                            {
                                _id:psy4id,
                                psy4Name:req.body.psy4Name,
                                psy4patientCount:req.body.psy4patientCount
                            },
                psychiatrist5:
                            {
                                _id:psy5id,
                                psy5Name:req.body.psy5Name,
                                psy5patientCount:req.body.psy5patientCount
                            }}
    });

    newHospital.save(function(err) {
      if (!err) {
        res.send("Successfully added a new Hospital");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Hospital.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully Deleted all Hospital")
      } else {
        res.send(err);
      }
    })
  });

/////////////// request target articles
app.route("/Hospitals/:hospitalID")

  .get(function(req, res) {

    Hospital.findOne({
      _id: req.params.hospitalID
    }, function(err, foundHospital) {
      if (err) {
        res.send("No matched Hospital found");
      } else {
        res.send(foundHospital);
      }
    });
  })

  .patch(function(req, res) {
    Hospital.updateOne({
        _id: req.params.hospitalID
      }, //condition
      {
        $set: req.body
      },
      {
        overwrite: true
      }, //to not to prevent overwrite
      function(err) {
        if (err) {
          res.send("Error Saving");
        } else {
          res.send("Saved Successfully");
        }
      });
  })



app.listen(3000, function() {
  console.log("PORT 3000");
});
