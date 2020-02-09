class AdministrationItem {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends AdministrationItem {
    constructor (name, buildYear, areaSize, numTrees) {
        super(name, buildYear);
        this.areaSize = areaSize;
        this.numTrees = numTrees;
    }

    logDensity() {
        const density = this.numTrees / this.areaSize;
        console.log(`${this.name} has a tree density of ${density} trees per square kilometer.`);
    }
}

class Street extends AdministrationItem {
    constructor (name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
        this.classificaton = new Map();
        this.classificaton.set(1, "tiny");
        this.classificaton.set(2, "small");
        this.classificaton.set(3, "normal");
        this.classificaton.set(4, "large");
        this.classificaton.set(5, "huge");
    }

    logSize() {
        console.log(`${this.name}, built in ${this.buildYear}, is a ${this.classificaton.get(this.size)} street.`);
    }
}

const allParks = [
    new Park("Allacher Forst", 1920, 30, 1200),
    new Park("Nympenburger Schlossgarten", 1930, 100, 200),
    new Park("Grüne Wiese", 1800, 60, 20)
];

const allStreets = [
    new Street("Eversbuschstraße", 1922, 7, 4),
    new Street("Von-Kahr-Straße", 1892, 22, 5),
    new Street("Lauthstraße", 1967, 1),
    new Street("Carrierstraße", 2009, 0.4, 1),
];

function reportParks(parks) {
    console.log('----PARKS REPORT----');
    //Log average
    const average = parks.map(park => new Date().getFullYear() - park.buildYear).reduce((sum, age) => sum + age) / parks.length;
    console.log(`Our ${parks.length} parks have an average age of ${average} years.`);

    // Log densitys
    parks.forEach(park => park.logDensity());

    //Log parks with more than 1000 trees
    const parkNames = parks.filter(park => park.numTrees >= 1000).map(park => park.name);
    parkNames.forEach(name => console.log(`${name} has more than 1000 trees.`));
}

function reportStreets(streets) {
    console.log('----STREETS REPORT----');

    //Log total and average length
    const totalLength = streets.map(street => street.length).reduce((sum, length) => sum + length);
    const average = totalLength / streets.length;
    console.log(`Our ${streets.length} have a total length of ${totalLength} km, with an average of ${average} km.`);

    //Log information
    streets.forEach(street => street.logSize());
}

reportParks(allParks);
reportStreets(allStreets);