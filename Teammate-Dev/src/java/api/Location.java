/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Spanp
 */
@Entity
@Table(name = "location")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Location.findAll", query = "SELECT l FROM Location l")
    , @NamedQuery(name = "Location.findByLcId", query = "SELECT l FROM Location l WHERE l.lcId = :lcId")
    , @NamedQuery(name = "Location.findByName", query = "SELECT l FROM Location l WHERE l.name = :name")
    , @NamedQuery(name = "Location.findByLatitude", query = "SELECT l FROM Location l WHERE l.latitude = :latitude")
    , @NamedQuery(name = "Location.findByLongitude", query = "SELECT l FROM Location l WHERE l.longitude = :longitude")
    , @NamedQuery(name = "Location.findByByAdmin", query = "SELECT l FROM Location l WHERE l.byAdmin = :byAdmin")})
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "lc_id")
    private Integer lcId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 15)
    @Column(name = "latitude")
    private String latitude;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 15)
    @Column(name = "longitude")
    private String longitude;
    @Basic(optional = false)
    @NotNull
    @Column(name = "by_admin")
    private boolean byAdmin;
    @OneToMany(mappedBy = "location")
    private Collection<Lobby> lobbyCollection;
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @ManyToOne
    private Customer cId;

    public Location() {
    }

    public Location(Integer lcId) {
        this.lcId = lcId;
    }

    public Location(Integer lcId, String name, String latitude, String longitude, boolean byAdmin) {
        this.lcId = lcId;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.byAdmin = byAdmin;
    }

    public Integer getLcId() {
        return lcId;
    }

    public void setLcId(Integer lcId) {
        this.lcId = lcId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public boolean getByAdmin() {
        return byAdmin;
    }

    public void setByAdmin(boolean byAdmin) {
        this.byAdmin = byAdmin;
    }

    @XmlTransient
    public Collection<Lobby> getLobbyCollection() {
        return lobbyCollection;
    }

    public void setLobbyCollection(Collection<Lobby> lobbyCollection) {
        this.lobbyCollection = lobbyCollection;
    }

    public Customer getCId() {
        return cId;
    }

    public void setCId(Customer cId) {
        this.cId = cId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (lcId != null ? lcId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Location)) {
            return false;
        }
        Location other = (Location) object;
        if ((this.lcId == null && other.lcId != null) || (this.lcId != null && !this.lcId.equals(other.lcId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Location[ lcId=" + lcId + " ]";
    }
    
}
