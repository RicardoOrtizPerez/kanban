import axiosClient from "./axiosClient"

const organizationApi = {
    getAllOrganizations: () => axiosClient.post('asociations/byUser'),
}

export default organizationApi