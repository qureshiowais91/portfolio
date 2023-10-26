var UberRideCalculator = /** @class */ (function () {
    function UberRideCalculator(baseFare, perKilometerRate) {
        this.baseFareAmount = baseFare;
        this.perKilometerRateAmount = perKilometerRate;
    }
    UberRideCalculator.prototype.calculateRidePrice = function (distanceInKm) {
        return this.baseFareAmount + this.perKilometerRateAmount * distanceInKm;
    };
    return UberRideCalculator;
}());
var standardUberCalculator = new UberRideCalculator(5, 1.5);
var premiumUberCalculator = new UberRideCalculator(8, 2.0);
var distanceToDestination = 20;
var standardUberPrice = standardUberCalculator.calculateRidePrice(distanceToDestination);
console.log("Standard Uber Price: $".concat(standardUberPrice));
var premiumUberPrice = premiumUberCalculator.calculateRidePrice(distanceToDestination);
console.log("Premium Uber Price: $".concat(premiumUberPrice));
