/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api.service;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Spanp
 */
@javax.ws.rs.ApplicationPath("api-v1")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(api.service.AdvertiseFacadeREST.class);
        resources.add(api.service.ConversationFacadeREST.class);
        resources.add(api.service.CrossOriginResourceSharingFilter.class);
        resources.add(api.service.CustomerFacadeREST.class);
        resources.add(api.service.ImageFacadeREST.class);
        resources.add(api.service.InterestingFacadeREST.class);
        resources.add(api.service.JoinlobbyFacadeREST.class);
        resources.add(api.service.LobbyFacadeREST.class);
        resources.add(api.service.LocationFacadeREST.class);
        resources.add(api.service.MedicalFacadeREST.class);
        resources.add(api.service.NotifyFacadeREST.class);
        resources.add(api.service.SportFacadeREST.class);
    }

}
