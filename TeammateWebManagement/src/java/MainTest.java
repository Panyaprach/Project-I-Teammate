import java.util.List;


public class MainTest {
    public static void main(String[] args){
        Customer cus = new Customer();
        List<Customer> customerList = cus.getAllAttribute();
        for(Customer customer : customerList){
            System.out.println("generate_date :"+customer.getGenerate_date().toGMTString());
            System.out.println("birthdate : "+customer.getBirthdate().toLocaleString().substring(0,12));
        }
    }
}