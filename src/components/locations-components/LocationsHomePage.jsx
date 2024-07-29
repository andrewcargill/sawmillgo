import React from "react";
import AddLocationForm from "./AddLocationForm";
import AreasMap from "./AreasMap";
import LocationsTable from "./LocationsTable";


const LocationsHomePage = () => {
    return (
        <div>
       {/* <AddLocationForm /> */}
       <AreasMap />
       <LocationsTable />

        </div>
    );
    };

export default LocationsHomePage;