import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import lisitingService from "../apisModel/lisitingService";

const handleApiError = (error, defaultMessage) => {
  const message =
    error?.response?.data?.message || error?.message || defaultMessage;
  toast.error(message);
  return { error: true, message };
};

export const GetAllVendorData = createAsyncThunk(
  "listing/getAllVendors",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getAllVendor(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.data?.results || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch vendors."));
    }
  }
);

export const GetAllSubUsers = createAsyncThunk(
  "listing/getAllSubUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getAllSubUsers(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.data?.results || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch vendors."));
    }
  }
);

export const GetCategories = createAsyncThunk(
  "listing/getCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getCategories(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch categories.")
      );
    }
  }
);

export const GetSubCategories = createAsyncThunk(
  "listing/getSubCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getSubCategories(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch subcategories.")
      );
    }
  }
);

export const GetCategoryProducts = createAsyncThunk(
  "listing/getCategoryProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getProducts(payload);
      if (!response || response.error) throw new Error(response?.message);
      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch Products.")
      );
    }
  }
);
export const GetCategoryProductsDetails = createAsyncThunk(
  "listing/getCategoryProductsDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getProductDetails(payload);
      console.log(response, "response in getCategoryProductsDetails");

      if (!response || response.error) throw new Error(response?.message);
      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch Products.")
      );
    }
  }
);

export const GetScheduledMeetings = createAsyncThunk(
  "listing/scheduledMeetings",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getMeetings(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch meetings.")
      );
    }
  }
);
export const GetRecentProposals = createAsyncThunk(
  "listing/recentProposals",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getRecentProposals(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch meetings.")
      );
    }
  }
);

export const GetRecentProjects = createAsyncThunk(
  "listing/recentProjects",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getRecentProposals(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch meetings.")
      );
    }
  }
);

export const GetRecentTransactions = createAsyncThunk(
  "listing/recentTransactions",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getRecentTransactions(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch meetings.")
      );
    }
  }
);

export const GetDocsData = createAsyncThunk(
  "listing/getDocsData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getDocuments(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch Docs."));
    }
  }
);
export const GetContractsData = createAsyncThunk(
  "listing/getContData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getAllContracts(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch Docs."));
    }
  }
);


export const GetFavorites = createAsyncThunk(
  "listing/getFavorites",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getAllFavorites(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch."));
    }
  }
);

export const GetMyOffers = createAsyncThunk(
  "listing/getMyOffers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getOffersListing(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch."));
    }
  }
);

export const GetDashStats = createAsyncThunk(
  "listing/getStats",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getDashStatsCount(payload);
      if (!response || response.error) throw new Error(response?.message);
      console.log({ response });

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch."));
    }
  }
);

export const GetMaterialCodeListing = createAsyncThunk(
  "listing/getMaterialCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await lisitingService.getMaterialCode(payload);
      console.log(response, "Product Material Code Listing");
      if (!response || response.error) throw new Error(response?.message);

      return response?.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch vendor documents.")
      );
    }
  }
);

const initialState = {
  vendors: [],
  categories: [],
  subCategories: [],
  categoryProducts: [],
  productDetails: [],
  meetings: [],
  projects: [],
  transactions: [],
  services: [],
  proposals: [],
  documentList: [],
  contractDocs: [],
  subUsers: [],
  news: [],
  statsCount: [],
  materialCodeListing: [],
  loading: false,
  error: null,
  message: null,
  pagination: {
    vendorsTotal: null,
    categoriesTotal: null,
    subCategoriesTotal: null,
    productsTotal: null,
  },
  favorites: [],
  offers: [],
};

const listing = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetPagination: (state) => {
      state.pagination = {
        vendors: null,
        categories: null,
        subCategories: null,
      };
    },
    logout: (state) => {
      state.vendors = [];
      state.categories = [];
      state.subCategories = [];
      state.productDetails = [];
      state.pagination = {
        vendorsTotal: null,
        categoriesTotal: null,
        subCategoriesTotal: null,
        productsTotal: null,
      };
      state.categoryProducts = [];
      state.productsTotal = [];
      state.meetings = [];
      state.materialCodeListing = [];
      state.projects = [];
      state.transactions = [];
      state.proposals = [];
      state.loading = false;
      state.error = null;
      state.message = null;
      state.favorites = [];
      state.offers = [];
      state.contractDocs = [];
      state.subUsers = [];
      state.statsCount = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllVendorData.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllVendorData.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
        state.pagination.vendorsTotal = action.payload;
      })
      .addCase(GetAllVendorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Categories
      .addCase(GetCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.pagination.categoriesTotal = action.payload;
      })
      .addCase(GetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // SubCategories
      .addCase(GetSubCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
        state.pagination.subCategoriesTotal = action.payload;
      })

      .addCase(GetSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Category Products
      .addCase(GetCategoryProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(GetCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Category Products Details
      .addCase(GetCategoryProductsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCategoryProductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(GetCategoryProductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Scheduled Meetings
      .addCase(GetScheduledMeetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetScheduledMeetings.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings = action.payload;
      })
      .addCase(GetScheduledMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Recent Proposals
      .addCase(GetRecentProposals.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRecentProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(GetRecentProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // GetRecentProjects
      .addCase(GetRecentProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRecentProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(GetRecentProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // GetRecentTransactions
      .addCase(GetRecentTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRecentTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(GetRecentTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // GetDocsData
      .addCase(GetDocsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetDocsData.fulfilled, (state, action) => {
        state.loading = false;
        state.documentList = action.payload;
      })
      .addCase(GetDocsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
     
      .addCase(GetFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(GetFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // My Offers Listing
      .addCase(GetMyOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetMyOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(GetMyOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // My Contarcts Listing
      .addCase(GetContractsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetContractsData.fulfilled, (state, action) => {
        state.loading = false;
        state.contractDocs = action.payload;
      })
      .addCase(GetContractsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(GetAllSubUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllSubUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.subUsers = action.payload;
      })
      .addCase(GetAllSubUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(GetDashStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetDashStats.fulfilled, (state, action) => {
        state.loading = false;
        state.statsCount = action.payload;
      })
      .addCase(GetDashStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Material code listing
      .addCase(GetMaterialCodeListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetMaterialCodeListing.fulfilled, (state, action) => {
        state.loading = false;
        state.materialCodeListing = action.payload;
      })
      .addCase(GetMaterialCodeListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logout, clearError, clearMessage, categories } = listing.actions;
export default listing.reducer;
