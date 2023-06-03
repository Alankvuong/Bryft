import "./DriverProfile.css";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import tempPhoto from "../DriverProfilePage/alan_temp_photo.jpg"
import tempPhoto from "../DriverProfilePage/blank-profile-image.webp";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function driverProfile() {

    return (
        <>
            <Navbar/>
            <div className="profile-page">
                <div className="driver-container">
                    <img className="driver-photo" src={tempPhoto} alt="driver" />
                    <h2 className="driver-name">John Doe</h2>
                    <h4 className="driver-car">Model: Honda Accord</h4>
                    <p className="driver-bio">Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Arcu felis bibendum ut tristique et.</p>
                </div>

                <div className="reviews">
                    <h3 className="reviews-heading">Reviews</h3>
                    <Accordion className="reviews-accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className="review-title"
                        >
                            <div className="driver-rating">5.0</div>
                            <div className="review-title">
                                Review Title
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="review-expanded">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Arcu felis bibendum ut tristique et. Et ultrices neque ornare aenean euismod elementum nisi. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Nec sagittis aliquam malesuada bibendum arcu vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada. Sit amet massa vitae tortor condimentum lacinia quis.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="reviews-accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className="review-title"
                        >
                            <div className="driver-rating">5.0</div>
                            <div className="review-title">
                                Review Title
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="review-expanded">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Arcu felis bibendum ut tristique et. Et ultrices neque ornare aenean euismod elementum nisi. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Nec sagittis aliquam malesuada bibendum arcu vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada. Sit amet massa vitae tortor condimentum lacinia quis.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="reviews-accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className="review-title"
                        >
                            <div className="driver-rating">5.0</div>
                            <div className="review-title">
                                Review Title
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="review-expanded">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Arcu felis bibendum ut tristique et. Et ultrices neque ornare aenean euismod elementum nisi. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Nec sagittis aliquam malesuada bibendum arcu vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada. Sit amet massa vitae tortor condimentum lacinia quis.
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>
    )
};

export default driverProfile;