import React, { createContext, useState, useEffect, useCallback } from 'react';
import { batchApi } from '@/lib/api';

export const DataContext = createContext();

export function DataProvider({ children }) {
  // Data states
  const [essentialData, setEssentialData] = useState(null);
  const [optionalData, setOptionalData] = useState(null);
  
  // Loading states
  const [isLoadingEssential, setIsLoadingEssential] = useState(true);
  const [isLoadingOptional, setIsLoadingOptional] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  
  // Error states
  const [essentialError, setEssentialError] = useState(null);
  const [optionalError, setOptionalError] = useState(null);

  // Fetch essential data
  const fetchEssentialData = useCallback(async () => {
    setIsLoadingEssential(true);
    setLoadingProgress(10);
    setLoadingMessage('Loading department information...');
    
    try {
      setLoadingProgress(30);
      setLoadingMessage('Fetching faculty data...');
      
      const response = await batchApi.getEssential();
      
      setLoadingProgress(80);
      setLoadingMessage('Processing data...');
      
      setEssentialData(response.data);
      setEssentialError(null);
      setLoadingProgress(100);
      setLoadingMessage('Ready!');
      
      // Start loading optional data in background
      setTimeout(() => fetchOptionalData(), 500);
      
    } catch (error) {
      console.error('Error fetching essential data:', error);
      setEssentialError(error.message || 'Failed to load essential data');
    } finally {
      setIsLoadingEssential(false);
    }
  }, []);

  // Fetch optional data
  const fetchOptionalData = useCallback(async () => {
    if (optionalData) return; // Don't refetch if already loaded
    
    setIsLoadingOptional(true);
    
    try {
      const response = await batchApi.getOptional();
      setOptionalData(response.data);
      setOptionalError(null);
    } catch (error) {
      console.error('Error fetching optional data:', error);
      setOptionalError(error.message || 'Failed to load optional data');
    } finally {
      setIsLoadingOptional(false);
    }
  }, [optionalData]);

  // Refresh all data
  const refreshData = useCallback(async () => {
    setOptionalData(null);
    await fetchEssentialData();
  }, [fetchEssentialData]);

  // Initial load
  useEffect(() => {
    fetchEssentialData();
  }, [fetchEssentialData]);

  // Helper function to check if data is ready
  const isReady = !isLoadingEssential && essentialData !== null;

  // Helper function to get data for specific page
  const getPageData = useCallback((pageName) => {
    if (!essentialData) return null;

    const data = {
      // Essential data
      department: essentialData.department,
      faculty: essentialData.faculty,
      events: essentialData.events,
      notices: essentialData.notices,
      facilities: essentialData.facilities,
      contact: essentialData.contact,
      
      // Optional data (may be null initially)
      ...(optionalData || {})
    };

    return data;
  }, [essentialData, optionalData]);

  // Context value
  const value = {
    // Data
    essentialData,
    optionalData,
    
    // Loading states
    isLoadingEssential,
    isLoadingOptional,
    loadingProgress,
    loadingMessage,
    isReady,
    
    // Errors
    essentialError,
    optionalError,
    
    // Actions
    refreshData,
    getPageData,
    
    // Direct data access helpers
    department: essentialData?.department,
    faculty: essentialData?.faculty,
    events: essentialData?.events,
    notices: essentialData?.notices,
    facilities: essentialData?.facilities,
    contact: essentialData?.contact,
    
    // Optional data
    accreditations: optionalData?.accreditations,
    advisoryBoard: optionalData?.advisoryBoard,
    bosMeetings: optionalData?.bosMeetings,
    syllabi: optionalData?.syllabi,
    programOutcomes: optionalData?.programOutcomes,
    journals: optionalData?.journals,
    conferences: optionalData?.conferences,
    clubs: optionalData?.clubs,
    publications: optionalData?.publications,
    fundedProjects: optionalData?.fundedProjects,
    patents: optionalData?.patents,
    researchSupervisors: optionalData?.researchSupervisors,
    phdStudents: optionalData?.phdStudents,
    mous: optionalData?.mous,
    consultancies: optionalData?.consultancies,
    awards: optionalData?.awards,
    gallery: optionalData?.gallery,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
