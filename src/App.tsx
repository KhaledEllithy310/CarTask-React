import React, { useEffect, useState } from "react";
import "./App.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import CheckBox from "./components/CheckBox";

interface CarModel {
  id: number;
  name: string;
}

const futureCars: CarModel[] = [
  {
    id: 1,
    name: "Volkswagen",
  },
  {
    id: 2,
    name: "BMW",
  },
  {
    id: 3,
    name: "Toyota",
  },
  {
    id: 4,
    name: "Nissan",
  },
  {
    id: 5,
    name: "General Motors",
  },
  {
    id: 6,
    name: "Hyundai",
  },
  {
    id: 7,
    name: "Peugeot",
  },
  {
    id: 8,
    name: "Kia",
  },
  {
    id: 9,
    name: "Volvo",
  },
  {
    id: 10,
    name: "Mazda",
  },
];
//sort the cars bt id
function getSortedCars(cars: CarModel[]): CarModel[] {
  return cars.sort((a, b) => a.id - b.id);
}

function App() {
  const [cars, setCars] = useState<CarModel[]>([...futureCars]);
  const [selectedCars, setSelectedCars] = useState<CarModel[]>([]);
  const [isShow, setIsShow] = useState<Boolean>(false);

  //apply the changes to the checkBox
  const handleApplyChanges = () => {
    const updatedCars = cars.filter((car) => !selectedCars.includes(car));
    const sortedCars = getSortedCars(selectedCars).concat(
      getSortedCars(updatedCars)
    );
    setCars(sortedCars);
  };
  //set the initial state for checkBox
  const initialState = () => {
    // Get the initial selected cars.
    let initialSelectedCars: CarModel[] = [];
    cars.forEach((car) => {
      if (car.id === 3 || car.id === 5) {
        initialSelectedCars.push(car);
      }
    });

    // Sort the initial selected cars.
    initialSelectedCars = getSortedCars(initialSelectedCars);
    setSelectedCars(initialSelectedCars);
    // Get the updated cars.
    let updatedCars = cars.filter((car) => !initialSelectedCars.includes(car));

    // Sort the updated cars.
    updatedCars = getSortedCars(updatedCars);

    // Set the cars state variable.
    setCars(initialSelectedCars.concat(updatedCars));
  };

  //reset the checkBox and return the default state
  const handleReset = () => {
    initialState();
  };

  //detect change after checkbox
  const handleCheckBox = (e: any, car: CarModel) => {
    const isChecked = e.target.checked;
    //show button apply changes
    setIsShow(true);

    if (isChecked) {
      setSelectedCars((prevSelectedCars) => [...prevSelectedCars, car]);
    } else {
      setSelectedCars((prevSelectedCars) =>
        prevSelectedCars.filter((selectedCar) => selectedCar.id !== car.id)
      );
    }
  };
  // set the initial state after render
  useEffect(() => {
    initialState();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="car">
          <div className="car__header">
            <div>
              <button
                className="car__header__btn upperCase"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
            <h3 className="car__header__title">Future Cars</h3>
            <div>
              <button
                className={`car__header__btn capitalize ${
                  isShow ? "" : "hidden"
                }`}
                onClick={handleApplyChanges}
              >
                Apply Changes
              </button>
            </div>
          </div>
          <div className="car__content">
            {cars.map((car) => (
              <CheckBox
                key={car.id}
                car={car}
                selectedCars={selectedCars}
                handleCheckBox={handleCheckBox}
              />
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
