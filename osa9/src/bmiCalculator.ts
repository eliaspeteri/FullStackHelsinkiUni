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

export const calculateBmi = (height: number, weight: number): string => {
    const BMI = weight / ((height / 100) ^ 2);
    if (BMI < 18.5) {
        return "Underweight";
    } else if (BMI > 25 && BMI < 30) {
        return "Overweight";
    } else if (BMI > 30) {
        return "Obese";
    } else {
        return "Healthy weight";
    }
};

try {
    const { val1, val2 } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(Number(val1), Number(val2)));
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("Error, something bad happened: ", e.message);
}
