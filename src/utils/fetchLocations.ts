interface LocationData {
  REGION: string;
  REGIONCODE: string;
  DISTRICT: string;
  DISTRICTCODE: string;
  WARD: string;
  WARDCODE: string;
  STREET: string;
}

const locationData: LocationData[] = [
  {
    REGION: "DAR-ES-SALAAM",
    REGIONCODE: "11",
    DISTRICT: "ILALA CBD",
    DISTRICTCODE: "11",
    WARD: "KIVUKONI",
    WARDCODE: "11101",
    STREET: "KIVUKONI"
  },
  // ... other data
];

export const fetchRegions = (): { id: string; name: string }[] => {
  const uniqueRegions = new Set(locationData.map(item => item.REGION));
  return Array.from(uniqueRegions).map(region => ({
    id: region,
    name: region
  }));
};

export const fetchDistricts = (region: string): { id: string; name: string }[] => {
  const districts = new Set(
    locationData
      .filter(item => item.REGION === region)
      .map(item => item.DISTRICT)
  );
  return Array.from(districts).map(district => ({
    id: district,
    name: district
  }));
};

export const fetchWards = (district: string): { id: string; name: string }[] => {
  const wards = new Set(
    locationData
      .filter(item => item.DISTRICT === district)
      .map(item => item.WARD)
  );
  return Array.from(wards).map(ward => ({
    id: ward,
    name: ward
  }));
};

export const getStreets = (ward: string): string[] => {
  return Array.from(
    new Set(
      locationData
        .filter(item => item.WARD === ward)
        .map(item => item.STREET)
    )
  );
};