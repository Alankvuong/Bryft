import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, OutlinedInput } from '@mui/material';
import axios from 'axios';
import "./RideModal.css";
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

export default function RideModal() {
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState(dayjs());
  const [rideData, setRideData] = useState({
    origin: '',
    destination: '',
    driver: '',
    price: '',
    driverUid: '',
    riderUids: [],
    numSpots: 0,
    dateTime: dateTime,
    displayDateTime: ''
  });

  //tracks if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let name = '';
    onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
      if (currentUser?.uid) {
        axios.get('http://localhost:8000/api/get-names', { params: { uids: [currentUser.uid] } })
          .then((response) => {
            name = response.data.names[0];
            setRideData({ ...rideData, driver: name, driverUid: currentUser.uid });
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        setRideData({ ...rideData, driver: name, driverUid: currentUser.uid });
      } else {
        console.log("currentUser is null");
      }
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let monthStr = dateTime.$M + 1;
    if (monthStr < 10) {
      monthStr = "0" + monthStr;
    }

    let dayStr = dateTime.$D;
    if (dateTime.$D  < 10) {
      dayStr = "0" + dayStr;
    }

    let minuteStr = dateTime.$m;
    if (dateTime.$m  < 10) {
      minuteStr = "0" + minuteStr;
    }

    // format date and time into Date() permitted string
    let dateTimeStr = dateTime.$y + "-" + monthStr + "-" + dayStr + "T" + dateTime.$H + ":" + minuteStr;
    let displayDateTimeStr = (dateTime.$M + 1) + '/' + dateTime.$D + '/' + dateTime.$y + " ";

    if (dateTime.$H === 12) {
      displayDateTimeStr += "12:" + minuteStr + "PM";
    } else if (dateTime.$H === 0) {
      displayDateTimeStr += "12:" + minuteStr + "AM";
    } else if (dateTime.$H < 12) {
      displayDateTimeStr += dateTime.$H + ":" + minuteStr + "AM";
    } else {
      displayDateTimeStr += (dateTime.$H - 12) + ":" + minuteStr + "PM";
    }

    //check that all fields of form have been filled out
    if (rideData.origin === '' || rideData.destination === '' || rideData.price === '' || rideData.departureTime === '' || rideData.numSpots === 0) {
      alert('Please fill out all fields');
      return;
    }

    axios.post('http://localhost:8000/api/create-ride', {...rideData, dateTime: dateTimeStr, displayDateTime: displayDateTimeStr, price: parseFloat(rideData.price).toFixed(2)})
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    handleClose();
    window.location.reload();
  };

  return (
    <>
    
      <Button className="create-ride-post-btn" variant="contained" color="primary" onClick={handleOpen}>
        Create Ride Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {!isLoggedIn && <div className="error-message">You need to be logged in to create a ride post!</div>}
        <DialogTitle>Ride Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField required label="Where will you be leaving from?" name="origin" value={rideData.origin} onChange={handleChange} margin="normal" fullWidth />
            <TextField required label="Where will you be heading?" name="destination" value={rideData.destination} onChange={handleChange} margin="normal" fullWidth />
            <TextField InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} required label="Price" name="price" value={rideData.price} onChange={handleChange} placeholder="34.60" margin="normal" />
            <TextField inputProps={{min: 0}} required label="Number Of Passengers You Want To Take" name="numSpots" type="number" value={rideData.numSpots} onChange={handleChange} margin="normal" fullWidth />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker slotProps={{ textField: { error: false } }} label="Departure Date and Time" value={rideData?.dateTime || dayjs()} onChange={(newDatetime) => setDateTime(newDatetime)} disablePast />
              </DemoContainer>
            </LocalizationProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!isLoggedIn}>
            Create Ride
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

