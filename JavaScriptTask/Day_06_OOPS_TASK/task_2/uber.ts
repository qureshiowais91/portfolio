class UberRideCalculator {
    private baseFareAmount: number;
    private perKilometerRateAmount: number;

    constructor(baseFare: number, perKilometerRate: number) {
        this.baseFareAmount = baseFare;
        this.perKilometerRateAmount = perKilometerRate;
    }

    calculateRidePrice(distanceInKm: number): number {
        return this.baseFareAmount + this.perKilometerRateAmount * distanceInKm;
    }
}

const standardUberCalculator = new UberRideCalculator(5, 1.5);
const premiumUberCalculator = new UberRideCalculator(8, 2.0); 

const distanceToDestination = 20;

const standardUberPrice = standardUberCalculator.calculateRidePrice(distanceToDestination);
console.log(`Standard Uber Price: $${standardUberPrice}`);

const premiumUberPrice = premiumUberCalculator.calculateRidePrice(distanceToDestination);
console.log(`Premium Uber Price: $${premiumUberPrice}`);
