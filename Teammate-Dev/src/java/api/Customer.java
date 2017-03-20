/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Spanp
 */
@Entity
@Table(name = "customer")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Customer.findAll", query = "SELECT c FROM Customer c")
    , @NamedQuery(name = "Customer.findByCId", query = "SELECT c FROM Customer c WHERE c.cId = :cId")
    , @NamedQuery(name = "Customer.findByUsername", query = "SELECT c FROM Customer c WHERE c.username = :username")
    , @NamedQuery(name = "Customer.findByFirstname", query = "SELECT c FROM Customer c WHERE c.firstname = :firstname")
    , @NamedQuery(name = "Customer.findByLastname", query = "SELECT c FROM Customer c WHERE c.lastname = :lastname")
    , @NamedQuery(name = "Customer.findByBirthdate", query = "SELECT c FROM Customer c WHERE c.birthdate = :birthdate")
    , @NamedQuery(name = "Customer.findByGender", query = "SELECT c FROM Customer c WHERE c.gender = :gender")
    , @NamedQuery(name = "Customer.findByGenerateDate", query = "SELECT c FROM Customer c WHERE c.generateDate = :generateDate")
    , @NamedQuery(name = "Customer.findByStatus", query = "SELECT c FROM Customer c WHERE c.status = :status")
    , @NamedQuery(name = "Customer.findByAge", query = "SELECT c FROM Customer c WHERE c.age = :age")
    , @NamedQuery(name = "Customer.findByAboutme", query = "SELECT c FROM Customer c WHERE c.aboutme = :aboutme")})
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "c_id")
    private Integer cId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "username")
    private String username;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "firstname")
    private String firstname;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 25)
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "birthdate")
    @Temporal(TemporalType.DATE)
    private Date birthdate;
    @Column(name = "gender")
    private Character gender;
    @Column(name = "generate_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date generateDate;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "status")
    private String status;
    @Basic(optional = false)
    @NotNull
    @Column(name = "age")
    private int age;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "aboutme")
    private String aboutme;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cId")
    private Collection<Interesting> interestingCollection;
    @OneToMany(mappedBy = "cId")
    private Collection<Location> locationCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cId")
    private Collection<Joinlobby> joinlobbyCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cId")
    private Collection<Conversation> conversationCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fromUser")
    private Collection<Notify> notifyCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "toUser")
    private Collection<Notify> notifyCollection1;
    @JoinColumn(name = "image", referencedColumnName = "img_id")
    @ManyToOne
    private Image image;

    public Customer() {
    }

    public Customer(Integer cId) {
        this.cId = cId;
    }

    public Customer(Integer cId, String username, String firstname, String lastname, String status, int age, String aboutme) {
        this.cId = cId;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.status = status;
        this.age = age;
        this.aboutme = aboutme;
    }

    public Integer getCId() {
        return cId;
    }

    public void setCId(Integer cId) {
        this.cId = cId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Character getGender() {
        return gender;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }

    public Date getGenerateDate() {
        return generateDate;
    }

    public void setGenerateDate(Date generateDate) {
        this.generateDate = generateDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAboutme() {
        return aboutme;
    }

    public void setAboutme(String aboutme) {
        this.aboutme = aboutme;
    }

    @XmlTransient
    public Collection<Interesting> getInterestingCollection() {
        return interestingCollection;
    }

    public void setInterestingCollection(Collection<Interesting> interestingCollection) {
        this.interestingCollection = interestingCollection;
    }

    @XmlTransient
    public Collection<Location> getLocationCollection() {
        return locationCollection;
    }

    public void setLocationCollection(Collection<Location> locationCollection) {
        this.locationCollection = locationCollection;
    }

    @XmlTransient
    public Collection<Joinlobby> getJoinlobbyCollection() {
        return joinlobbyCollection;
    }

    public void setJoinlobbyCollection(Collection<Joinlobby> joinlobbyCollection) {
        this.joinlobbyCollection = joinlobbyCollection;
    }

    @XmlTransient
    public Collection<Conversation> getConversationCollection() {
        return conversationCollection;
    }

    public void setConversationCollection(Collection<Conversation> conversationCollection) {
        this.conversationCollection = conversationCollection;
    }

    @XmlTransient
    public Collection<Notify> getNotifyCollection() {
        return notifyCollection;
    }

    public void setNotifyCollection(Collection<Notify> notifyCollection) {
        this.notifyCollection = notifyCollection;
    }

    @XmlTransient
    public Collection<Notify> getNotifyCollection1() {
        return notifyCollection1;
    }

    public void setNotifyCollection1(Collection<Notify> notifyCollection1) {
        this.notifyCollection1 = notifyCollection1;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cId != null ? cId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Customer)) {
            return false;
        }
        Customer other = (Customer) object;
        if ((this.cId == null && other.cId != null) || (this.cId != null && !this.cId.equals(other.cId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Customer[ cId=" + cId + " ]";
    }
    
}
