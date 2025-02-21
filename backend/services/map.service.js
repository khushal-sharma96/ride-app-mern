const axios = require('axios');
module.exports.getSuggestions = async (value) => {
    try{

        if (!value) throw new Error("Value is required to get the suggestions");
        console.log(value);
        const response = await axios.get("https://geocode.search.hereapi.com/v1/geocode", {
            params: {
                apiKey: process.env.HERE_API_KEY,
                q: value,
                in: 'countryCode:IND'
            }
        });
        console.log(response?.data);
        let suggestions = response?.data?.items ?? [];
        suggestions = suggestions.map((row) => {
            return {
                'title': row.title,
                'lat': row.position.lat,
                'lng': row.position.lng
            }
        });
        return { status: true, data: suggestions };
    }
    catch(error){
        console.log(err);
        return { status: true, error };
    }
}
module.exports.calculateFare = async ({ pickupLocation, dropLocation }) => {
    if (!pickupLocation || !dropLocation) throw new Error("All values are mandatory.");

    const response = await axios.get("https://router.hereapi.com/v8/routes", {
        params: {
            origin: `${pickupLocation.lat},${pickupLocation.lng}`,
            destination: `${dropLocation.lat},${dropLocation.lng}`,
            apiKey: process.env.HERE_API_KEY,
            return: 'summary',
            transportMode: 'car'
        }
    });
    let data = response?.data?.routes;

    if (data && data[0]) {
        const summary = data[0].sections[0].summary?.length;
        const distance = summary / 1000;
        const responseData = {
            distance,
            car: {
                time: distance * process.env.CAR_TIME,
                cost: Math.round(distance * process.env.CAR_COST),
            },
            bike: {
                time: distance * process.env.BIKE_TIME,
                cost: Math.round(distance * process.env.BIKE_COST),
            },
            auto: {
                time: distance * process.env.AUTO_TIME,
                cost: Math.round(distance * process.env.AUTO_COST),
            },
        }
        return { status: true, data: responseData };
    }

    return {status:false,message:'Distance could not found!'};
}