import { api } from "./api";
// Action Endpoints 75% complete, 
// waiting on showtimes and movies, 
// might have to edit certain inputs.

// Define actionsApi using api.injectEndpoints
const actionsApi = api.injectEndpoints({
    endpoints: (builder)=>({
        // Users Actions
        getUsers: builder.query({
            query: ()=> 'users', // GET request to fetch all users
        }),
        getUserById: builder.query({
            query: (id)=> `users/${id}`  // GET request to fetch user by ID
        }),
        getUserByUsername: builder.query({
            query: (username)=> `users/username/${username}` // GET request to fetch user by username
        }),
        deleteUser:builder.mutation({
            query:(id)=>({ // DELETE request to delete user by ID
                url:`users/${id}`,
                method:'DELETE'
            })
        }),
        createUser: builder.mutation({
            query:(body)=>({ // POST request to create a new user
                url:'users',
                method:"POST",
                body:body
            })
        }),
        updateUser: builder.mutation({
            query(data){ // PUT request to update user details
                const {id, ...body}=data;
                return {
                    url: `users/${id}`,
                    method:"PUT",
                    body
                }
            }
        }),

        // Theater Actions
        getTheaters: builder.query({
            query: ()=> 'theater',  // GET request to fetch all theaters
        }),
        getTheaterById: builder.query({  
            query: (id)=> `theater/${id}` // GET request to fetch theater by ID
        }),
        getTheaterByLocation: builder.query({ // GET request to fetch theaters by location
            query: (location)=> `theater/location/${location}`
        }),
        deleteTheater:builder.mutation({
            query:(id)=>({ // DELETE request to delete theater by ID
                url:`theater/${id}`,
                method:'DELETE'
            })
        }),
        createTheater: builder.mutation({
            query:(body)=>({ // POST request to create a new theater
                url:'theater',
                method:"POST",
                body:body
            })
        }),
        updateTheater: builder.mutation({
            query(data){ // PUT request to update theater details
                const {id, ...body}=data;
                return {
                    url: `theater/${id}`,
                    method:"PUT",
                    body
                }
            }
        }),

        // Reservations Actions
        getReservations: builder.query({
            query: ()=> 'reservations', // GET request to fetch all reservations
        }),
        getReservationByUserId: builder.query({
            query: (userId)=> `reservations/user/${userId}` // GET request to fetch reservations by user ID
        }),
        getReservationByTheaterId: builder.query({
            query: (theaterId)=> `reservations/theater/${theaterId}`  // GET request to fetch reservations by theater ID
        }),
        deleteReservation:builder.mutation({ 
            query:(id)=>({ // DELETE request to delete reservation by ID
                url:`reservations/${id}`,
                method:'DELETE'
            })
        }),
        createReservation: builder.mutation({
            query:(body, userId)=>({ // POST request to create a new reservation for a specific user
                url:`reservations/user/${userId}`,
                method:"POST",
                body:body
            })
        }),

        // Showtimes Actions
        getShowtimes: builder.query({
            query: ()=> 'showtimes', // GET request to fetch all showtimes
        }),
        getShowtimesByTheaterId: builder.query({
            query: (theaterId)=> `theater/${theaterId}/showtimes` // GET request to fetch showtimes by theater ID
        }),
        createShowtime: builder.mutation({
            query:(body, theaterId)=>({ // POST request to create a new showtime for a specific theater
                url:`theater/${theaterId}/showtimes`,
                method:"POST",
                body:body
            })
        }),
        updateTheater: builder.mutation({
            query(data, theaterId, showtimeId){ // PUT request to update showtime details
                const {id, ...body}=data;
                return {
                    url: `theater/${theaterId}/showtimes/${showtimeId}`,
                    method:"PUT",
                    body
                }
            }
        }),
        deleteShowtime:builder.mutation({
            query:(theaterId, showtimeId)=>({ // DELETE request to delete showtime by theater ID and showtime ID
                url:`theater/${theaterId}/showtimes/${showtimeId}`,
                method:'DELETE'
            })
        }),
    }),
});

export const {
    // Users Actions
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetUserByUsernameQuery,
    useDeleteUserMutation,
    useCreateUserMutation,
    useUpdateUserMutation,

    // Theater Actions
    useGetTheatersQuery,
    useGetTheaterByIdQuery,
    useGetTheaterByLocationQuery,
    useDeleteTheaterMutation,
    useCreateTheaterMutation,
    useUpdateTheaterMutation,

    // Reservations Actions
    useGetReservationsQuery,
    useGetReservationByUserIdQuery,
    useGetReservationByTheaterIdQuery,
    useDeleteReservationMutation,
    useCreateReservationMutation,

    // Showtimes Actions
    useGetShowtimesQuery,
    useCreateShowtimeMutation,
    useGetShowtimesByTheaterIdQuery,
    useDeleteShowtimeMutation,


} = actionsApi;