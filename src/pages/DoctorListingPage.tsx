import { useState, useEffect } from "react";
import { Container, Grid, Box, CircularProgress, Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import DoctorCard from "../components/DoctorCard";
import {
  Doctor,
  ConsultationType,
  SortType,
  FilterState,
} from "../types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

const DoctorListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    consultationType:
      (searchParams.get("consultationType") as ConsultationType) || "All",
    specialties:
      searchParams.get("specialties")?.split(",").filter(Boolean) || [],
    sortBy: (searchParams.get("sortBy") as SortType) || null,
    searchQuery: searchParams.get("search") || "",
  });

  // Initialize data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(API_URL);

        // Transform API data to match our Doctor interface
        const transformedDoctors: Doctor[] = response.data.map(
          (doctor: any) => ({
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialities.map((spec: any) => spec.name),
            experience: parseInt(doctor.experience.split(" ")[0]),
            fee: parseInt(doctor.fees.replace("₹ ", "")),
            consultationType:
              doctor.video_consult && doctor.in_clinic
                ? "Both"
                : doctor.video_consult
                ? "Video Consult"
                : "In Clinic",
            location: doctor.clinic.address.locality,
            qualifications: doctor.doctor_introduction
              ? doctor.doctor_introduction
                  .split(",")
                  .filter(
                    (q: string) =>
                      q.includes("BDS") ||
                      q.includes("MBBS") ||
                      q.includes("MD")
                  )
              : [],
            clinic: doctor.clinic.name,
            photo: doctor.photo,
          })
        );

        setDoctors(transformedDoctors);
        setFilteredDoctors(transformedDoctors);

        // Extract unique specialties
        const specialties = new Set<string>();
        transformedDoctors.forEach((doctor: Doctor) => {
          doctor.specialty.forEach((spec) => specialties.add(spec));
        });
        setAllSpecialties(Array.from(specialties));
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters and update URL
  useEffect(() => {
    if (!doctors.length) return;

    let filtered = [...doctors];

    // Apply search filter
    if (filters.searchQuery) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (filters.consultationType !== "All") {
      filtered = filtered.filter(
        (doctor) =>
          doctor.consultationType === filters.consultationType ||
          doctor.consultationType === "Both"
      );
    }

    // Apply specialty filters
    if (filters.specialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        doctor.specialty.some((spec) => filters.specialties.includes(spec))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        if (filters.sortBy === "fees") {
          return a.fee - b.fee;
        } else if (filters.sortBy === "experience") {
          return b.experience - a.experience;
        }
        return 0;
      });
    }

    setFilteredDoctors(filtered);

    // Update URL params
    const params: { [key: string]: string } = {};
    if (filters.consultationType !== "All")
      params.consultationType = filters.consultationType;
    if (filters.specialties.length)
      params.specialties = filters.specialties.join(",");
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.searchQuery) params.search = filters.searchQuery;
    setSearchParams(params);
  }, [filters, doctors, setSearchParams]);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleConsultationTypeChange = (type: ConsultationType) => {
    setFilters((prev) => ({ ...prev, consultationType: type }));
  };

  const handleSpecialtyChange = (specialty: string) => {
    setFilters((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleSortChange = (sort: SortType) => {
    setFilters((prev) => ({ ...prev, sortBy: sort }));
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <SearchBar doctors={doctors} onSearch={handleSearch} />
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Filters Section */}
        <Box sx={{ width: "25%", minWidth: "250px" }}>
          <FilterPanel
            consultationType={filters.consultationType}
            specialties={allSpecialties}
            selectedSpecialties={filters.specialties}
            sortBy={filters.sortBy}
            onConsultationTypeChange={handleConsultationTypeChange}
            onSpecialtyChange={handleSpecialtyChange}
            onSortChange={handleSortChange}
          />
        </Box>

        {/* Doctors Section */}
        <Box sx={{ flex: 1 }}>
          {filteredDoctors.length === 0 ? (
            <Alert severity="info">
              No doctors found matching your criteria.
            </Alert>
          ) : (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default DoctorListingPage;
