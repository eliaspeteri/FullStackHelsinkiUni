interface Values {
    val1: number;
    val2: number;
}

const parseArgumentsBmi = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error("Not enough arguments.");
    if (args.length > 4) throw new Error("Too many arguments.");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            val1: Number(args[2]),
            val2: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

const calculateBmi = (height: number, weight: number) => {
    const BMI = weight / ((height / 100) ^ 2);
    if (BMI < 18.5) {
        console.log("Underweight");
    } else if (BMI > 25 && BMI < 30) {
        console.log("Overweight");
    } else if (BMI > 30) {
        console.log("Obese");
    } else {
        console.log("Healthy weight");
    }
};
try {
    const { val1, val2 } = parseArgumentsBmi(process.argv);
    calculateBmi(Number(val1), Number(val2));
} catch (e) {
    console.log("Error, something bad happened: ", e.message);
}
