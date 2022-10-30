const isValidData = (data: any) =>
    data && Array.isArray(data) && data.length > 0;

export default isValidData;
