import React, { useEffect, useState } from "react";
import "./App.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";

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

function getSortedCars(cars: CarModel[]): CarModel[] {
  return cars.sort((a, b) => a.id - b.id);
}

function App() {
  const [cars, setCars] = useState<CarModel[]>([...futureCars]);
  const [selectedCars, setSelectedCars] = useState<CarModel[]>([]);
  const [isShow, setIsShow] = useState<Boolean>(false);

  const handleApplyChanges = () => {
    const updatedCars = cars.filter((car) => !selectedCars.includes(car));
    const sortedCars = getSortedCars(selectedCars).concat(
      getSortedCars(updatedCars)
    );

    setCars(sortedCars);
  };

  const handleReset = () => {
    setCars([...futureCars]);
    setSelectedCars([]);
  };

  const handleCheckBox = (e: any, car: CarModel) => {
    const isChecked = e.target.checked;
    setIsShow(true);

    if (isChecked) {
      setSelectedCars((prevSelectedCars) => [...prevSelectedCars, car]);
    } else {
      setSelectedCars((prevSelectedCars) =>
        prevSelectedCars.filter((selectedCar) => selectedCar.id !== car.id)
      );
    }
  };

  useEffect(() => {
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
            <h4>Future Cars</h4>
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
              <div className="car__content__row" key={car.id}>
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
                  onClick={(e) => handleCheckBox(e, car)}
                />
                <span className="car__content__row__carId">{car.id}</span>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
