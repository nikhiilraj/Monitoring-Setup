function getRandomValue(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("Cannot get random value from empty array");
    }
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function doSomeHeavyTask() {
    const ms = getRandomValue([100, 150, 200, 220, 350, 120, 630, 2500, 1500]);
    const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6, 7, 8]) === 8;

    if (shouldThrowError) {
        const randomError = getRandomValue([
            "Something exploded",
            "Task failed successfully",
            "Random failure occurred",
            "The universe said no"
        ]);
        throw new Error(randomError);
    }

    return new Promise((resolve) => {
        setTimeout(() => resolve(ms), ms);
    });
}

module.exports = doSomeHeavyTask;
