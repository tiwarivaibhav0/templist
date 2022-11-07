import React, { useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import homeModule from './Home.module.css'
import { Button, Select } from '@shopify/polaris';
import TableComponent from './listingTable/TableComponent';

export default function Home() {

  useEffect(() => {

  }, [])

  var sellerAccountOptions = [
    { label: <p style={{ fontSize: "1.3vw" }}>Jaikant's Store</p>, value: "Jaikant's Store" }
  ]

  return (
    <div className={homeModule.homeContainer}>
      <Navbar />
      <div className={homeModule.homeMainContainer}>
        <Sidebar />
        <div className={homeModule.listingContainer}>
          <div className={homeModule.listingHeader}>
            <div className={homeModule.listingHeaderFirst}>
              <p className={homeModule.listingFirstHeading}>Listings</p>
              <p className={homeModule.listingFirstSubheading}>
                You can manage your Shopify products here, which are enabled for Amazon by CedCommerce Sales Channel in your Shopify store.
              </p>
            </div>
            <div className={homeModule.listingHeaderSecond}>
              <Select
                label={<p><b>Seller Account</b></p>}
                options={sellerAccountOptions}
                // onChange={handleSelectChange}
                value="Jaikant's Store"
              />
            </div>
          </div>
          <div className={homeModule.homeMsgContainer}>
            <p className={homeModule.msgHeading}>
              <b>10 products are yet to be linked.</b>
            </p>
            <p className={homeModule.msgSubheading}>
              Manage Amazon orders and inventory from Shopify by linking Amazon listings to Shopify products.
            </p>
            <div className={homeModule.msgButtonDiv}>
              <Button>Link Products</Button>
            </div>
            <p className={homeModule.closeMsgbtn}>
              <i class="fa-solid fa-xmark"></i>
            </p>
          </div>
          <TableComponent />
        </div>
      </div>
    </div>
  )
}
