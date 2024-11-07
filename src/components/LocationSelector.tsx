import React, { useEffect, useState, useCallback } from 'react';
import { fetchRegions, fetchDistricts, fetchWards, getStreets } from '../utils/fetchLocations';

interface Location {
  region: string;
  district: string;
  ward: string;
  street: string;
}

interface LocationOption {
  id: string;
  name: string;
}

interface LocationSelectorProps {
  value: Location;
  onChange: (location: Location) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ value, onChange }) => {
  const [regions, setRegions] = useState<LocationOption[]>([]);
  const [districts, setDistricts] = useState<LocationOption[]>([]);
  const [wards, setWards] = useState<LocationOption[]>([]);
  const [streets, setStreets] = useState<string[]>([]);

  // Load regions once on mount
  useEffect(() => {
    const loadRegions = async () => {
      const data = fetchRegions();
      setRegions(data);
    };
    loadRegions();
  }, []);

  // Load districts when region changes
  useEffect(() => {
    if (value.region) {
      const data = fetchDistricts(value.region);
      setDistricts(data);
    } else {
      setDistricts([]);
    }
  }, [value.region]);

  // Load wards when district changes
  useEffect(() => {
    if (value.district) {
      const data = fetchWards(value.district);
      setWards(data);
    } else {
      setWards([]);
    }
  }, [value.district]);

  // Load streets when ward changes
  useEffect(() => {
    if (value.ward) {
      const streetList = getStreets(value.ward);
      setStreets(streetList);
    } else {
      setStreets([]);
    }
  }, [value.ward]);

  const handleRegionChange = (newRegion: string) => {
    onChange({
      region: newRegion,
      district: '',
      ward: '',
      street: ''
    });
  };

  const handleDistrictChange = (newDistrict: string) => {
    onChange({
      ...value,
      district: newDistrict,
      ward: '',
      street: ''
    });
  };

  const handleWardChange = (newWard: string) => {
    onChange({
      ...value,
      ward: newWard,
      street: ''
    });
  };

  const handleStreetChange = (newStreet: string) => {
    onChange({
      ...value,
      street: newStreet
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Region</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={value.region}
          onChange={(e) => handleRegionChange(e.target.value)}
        >
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">District</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={value.district}
          onChange={(e) => handleDistrictChange(e.target.value)}
          disabled={!value.region}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ward</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={value.ward}
          onChange={(e) => handleWardChange(e.target.value)}
          disabled={!value.district}
        >
          <option value="">Select Ward</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Street</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={value.street}
          onChange={(e) => handleStreetChange(e.target.value)}
          disabled={!value.ward}
        >
          <option value="">Select Street</option>
          {streets.map((street) => (
            <option key={street} value={street}>
              {street}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;