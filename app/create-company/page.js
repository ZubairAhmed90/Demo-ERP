"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Grid, Typography } from '@mui/material';
import { ChromePicker, SliderPicker } from 'react-color'; // Correct import for SliderPicker
import { useColor } from '../context/ColorContext';
import CustomButton from '../components/buttons/customButton/customButton';
import TextBar from '../components/fields/textField/textBar';
import { IoMdArrowBack } from 'react-icons/io';
import Layout from '../components/layout/layout';
import CancelButton from '../components/buttons/cancelButton/cancelButton';

const Page = () => {
  const { primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, tertiaryColor, setTertiaryColor } = useColor(); 
  const [imagePreview, setImagePreview] = useState(null);  

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Layout>
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex space-x-4 items-center">
          <Link href="/company">
            <IoMdArrowBack size={36} className="mt-1 border-2 border-blue-600 p-2 rounded-full" />
          </Link>
          <p className="text-2xl mt-1 text-black">Create Company</p>
        </div>
        <hr className="border-gray-700 w-full mt-4" />
        <form className="bg-white p-6 pb-9 pt-1 rounded-xl mt-2 min-h-52">
          <Grid container spacing={2} mt={2}>
            <TextBar grids={6} id="company" name="company" label="Company Name" type="text" />
            <TextBar grids={6} id="desc" name="desc" label="Description" type="text" />
            <TextBar grids={6} id="sap" name="sap" label="SAP Company" type="text" />
            <TextBar
              id="file"
              name="file"
              type="file"
              grids={6}
              onChange={handleImageChange}
              style={{ padding: "0px", background: "cover", display: "flex-start" }}
            />
            <Grid item xs={4}>
              <Typography>Primary Color</Typography>
              <ChromePicker
                color={primaryColor}
                onChangeComplete={(color) => setPrimaryColor(color.hex)}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Secondary Color</Typography>
              <SliderPicker // Using SliderPicker here
                color={secondaryColor}
                onChangeComplete={(color) => setSecondaryColor(color.hex)}
              />
            </Grid>
            {imagePreview && (
              <Grid item xs={4}>
                <div className="mt-4">
                  <Typography>Image Preview:</Typography>
                  <img src={imagePreview} alt="Image Preview" className="mt-2 h-48" />
                </div>
              </Grid>
            )}
            <Grid item xs={4}>
              <Typography>Tertiary Color</Typography>
              <ChromePicker
                color={tertiaryColor}
                onChangeComplete={(color) => setTertiaryColor(color.hex)}
              />
            </Grid>

            <Grid item xs={10}></Grid>

            <Grid item xs={1}>
              <Link href="/company">
                <CancelButton title="Cancel" className="mt-16" />
              </Link>
            </Grid>
            <Grid item xs={1}>
              <Link href="/company">
                <CustomButton title="Save" className="mt-16" />
              </Link>
            </Grid>

          </Grid>
        </form>
      </main>
    </Layout>
  );
};

export default Page;
