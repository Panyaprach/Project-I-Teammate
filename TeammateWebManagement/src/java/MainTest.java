import database.service.*;
import java.util.List;


public class MainTest {
    public static void main(String[] args){
        //Customer
        /*Customer cus = new Customer();
        List<Customer> customerList = cus.getAllAttribute();
        for(Customer customer : customerList){
            System.out.println("generate_date :"+customer.getGenerate_date().toGMTString());
            System.out.println("birthdate : "+customer.getBirthdate().toLocaleString().substring(0,12));
        }*/
        //Image
        /*Image img = new Image();
        List<Image> imglist = img.getAllAttribute();
        
        for(Image x : imglist){
            System.out.println("id : "+x.getId());
            System.out.println("path : "+x.getPath());
        }*/
        //Location
        /*Location loc = new Location();
        List<Location> local = loc.getAllAttribute();
        for(Location l : local){
            System.out.println("id : "+l.getId());
            System.out.println("name : "+l.getName());
            System.out.println("byAdmin : "+l.isByAdmin());
        }*/
        //Medical
        /*Medical loc = new Medical();
        List<Medical> local = loc.getAllAttribute();
        for(Medical l : local){
            System.out.println("id : "+l.getId());
            System.out.println("name : "+l.getContent());
            System.out.println("descript : "+l.getDescription());
        }*/
        //Advertise
        /*Advertise ads= new Advertise();
        List<Advertise> ad = ads.getAllAttribute();
        for(Advertise a : ad){
            System.out.println("id :"+a.getId());
            System.out.println("content :"+a.getContent());
        }*/
        //Sport
        Sport img = new Sport();
        List<Sport> imglist = img.getAllAttribute();
        
        for(Sport x : imglist){
            System.out.println("id : "+x.getId());
            System.out.println("name : "+x.getName());
        }
    }
}