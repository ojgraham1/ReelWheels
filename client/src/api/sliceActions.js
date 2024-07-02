import { api } from "./api";
// Action Endpoints 75% complete, 
// waiting on showtimes and movies, 
// might have to edit certain inputs.

const actionsApi = api.injectEndpoints({
    endpoints: (builder)=>({
        // Users Actions
        getUsers: builder.query({
            query: ()=> 'users',
        }),
        getUserById: builder.query({
            query: (id)=> `users/${id}`
        }),
        getUserByUsername: builder.query({
            query: (username)=> `users/username/${username}`
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`users/${id}`,
                method:'DELETE'
            })
        }),
        createUser: builder.mutation({
            query:(body)=>({
                url:'users',
                method:"POST",
                body:body
            })
        }),
        updateUser: builder.mutation({
            query(data){
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
            query: ()=> 'theater',
        }),
        getTheaterById: builder.query({
            query: (id)=> `theater/${id}`
        }),
        getTheaterByLocation: builder.query({
            query: (location)=> `theater/location/${location}`
        }),
        deleteTheater:builder.mutation({
            query:(id)=>({
                url:`theater/${id}`,
                method:'DELETE'
            })
        }),
        createTheater: builder.mutation({
            query:(body)=>({
                url:'theater',
                method:"POST",
                body:body
            })
        }),
        updateTheater: builder.mutation({
            query(data){
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
            query: ()=> 'reservations',
        }),
        getReservationByUserId: builder.query({
            query: (userId)=> `reservations/user/${userId}`
        }),
        getReservationByTheaterId: builder.query({
            query: (theaterId)=> `reservations/theater/${theaterId}`
        }),
        deleteReservation:builder.mutation({
            query:(id)=>({
                url:`reservations/${id}`,
                method:'DELETE'
            })
        }),
        createReservation: builder.mutation({
            query:(body, id)=>({
                url:`reservations/user/${id}`,
                method:"POST",
                body:body
            })
        }),

        // Showtimes Actions
        getShowtimes: builder.query({
            query: ()=> 'showtimes',
        }),
        getShowtimesByTheaterId: builder.query({
            query: (theaterId)=> `theater/${theaterId}/showtimes`
        }),
        // deleteShowtime:builder.mutation({
        //     query:()=>({
        //         url:`reservations/${id}`,
        //         method:'DELETE'
        //     })
        // }),
        // createShowtime: builder.mutation({
        //     query:(body)=>({
        //         url:`theater/${id}/showtimes`,
        //         method:"POST",
        //         body:body
        //     })
        // }),
        // updateTheater: builder.mutation({
        //     query(data){
        //         const {id, ...body}=data;
        //         return {
        //             url: `theater/${id}`,
        //             method:"PUT",
        //             body
        //         }
        //     }
        // }),


        // Movies Actions

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
    getShowtimes,
    getShowtimesByTheaterId,

    // Movies Actions


} = actionsApi;