const getAddress = (
  address: string,
  ward: string,
  district: string,
  city: string
) => {
  let addr = "";

  if (address) {
    addr = address;
  }
  if (ward) {
    addr += `, ${ward}`;
  }
  if (district) {
    addr += `, ${district}`;
  }
  if (city) {
    addr += `, ${city}`;
  }

  return addr;
};

export default getAddress;
