import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

const CheckBox = ({ car, selectedCars, handleCheckBox }) => {
  return (
    <div className="car__content__row">
      <FormControlLabel
        control={
          <Checkbox
            className="car__content__row__carName"
            checked={selectedCars.some(
              (selectedCar) => selectedCar.id === car.id
            )}
            id={car.id.toString()}
          />
        }
        label={car.name}
        onChange={(e) => handleCheckBox(e, car)}
      />
      <span className="car__content__row__carId">{car.id}</span>
    </div>
  );
};

export default CheckBox;
