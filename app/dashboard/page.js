"use client"

import React from 'react';
import { useColor } from '../context/ColorContext';
import Layout from '../components/layout/layout';
import Cards from '../components/cards/dashboard/cards';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function Page() {
  const { primaryColor , secondaryColor } = useColor();

  return (
    <Layout>
       <main className="flex-1 p-3 bg-gray-100">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    {/* Card 1 */}
    <Cards primaryColor={primaryColor} secondaryColor={secondaryColor} label="Open AP Invoices" count="38" value="150M" currency="SAR"/>

    {/* Card 2 */}
    <Cards primaryColor={primaryColor} secondaryColor={secondaryColor} label="Open Goods Receipt PO" count="38" value="150M" currency="SAR"/>
    
    {/* Card 3 */}
    <Cards primaryColor={primaryColor} secondaryColor={secondaryColor} label="Open Purchase Orders" count="38" value="150M" currency="SAR"/>

    {/* Card 4 */}
    <Cards primaryColor={primaryColor} secondaryColor={secondaryColor} label="Total Account Payables" count="38" value="150M" currency="SAR"/>
  </div>
</main>

      </Layout>
  );
}
