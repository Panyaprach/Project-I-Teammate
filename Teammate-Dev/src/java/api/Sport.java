/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Spanp
 */
@Entity
@Table(name = "sport")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Sport.findAll", query = "SELECT s FROM Sport s")
    , @NamedQuery(name = "Sport.findBySId", query = "SELECT s FROM Sport s WHERE s.sId = :sId")
    , @NamedQuery(name = "Sport.findByName", query = "SELECT s FROM Sport s WHERE s.name = :name")})
public class Sport implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "s_id")
    private Integer sId;
    @Size(max = 50)
    @Column(name = "name")
    private String name;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sport")
    private Collection<Lobby> lobbyCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sId")
    private Collection<Interesting> interestingCollection;

    public Sport() {
    }

    public Sport(Integer sId) {
        this.sId = sId;
    }

    public Integer getSId() {
        return sId;
    }

    public void setSId(Integer sId) {
        this.sId = sId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlTransient
    public Collection<Lobby> getLobbyCollection() {
        return lobbyCollection;
    }

    public void setLobbyCollection(Collection<Lobby> lobbyCollection) {
        this.lobbyCollection = lobbyCollection;
    }

    @XmlTransient
    public Collection<Interesting> getInterestingCollection() {
        return interestingCollection;
    }

    public void setInterestingCollection(Collection<Interesting> interestingCollection) {
        this.interestingCollection = interestingCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sId != null ? sId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Sport)) {
            return false;
        }
        Sport other = (Sport) object;
        if ((this.sId == null && other.sId != null) || (this.sId != null && !this.sId.equals(other.sId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Sport[ sId=" + sId + " ]";
    }
    
}
