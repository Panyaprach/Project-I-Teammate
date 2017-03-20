/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.Serializable;
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
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Spanp
 */
@Entity
@Table(name = "interesting")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Interesting.findAll", query = "SELECT i FROM Interesting i")
    , @NamedQuery(name = "Interesting.findByIId", query = "SELECT i FROM Interesting i WHERE i.iId = :iId")})
public class Interesting implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "i_id")
    private Integer iId;
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @ManyToOne(optional = false)
    private Customer cId;
    @JoinColumn(name = "s_id", referencedColumnName = "s_id")
    @ManyToOne(optional = false)
    private Sport sId;

    public Interesting() {
    }

    public Interesting(Integer iId) {
        this.iId = iId;
    }

    public Integer getIId() {
        return iId;
    }

    public void setIId(Integer iId) {
        this.iId = iId;
    }

    public Customer getCId() {
        return cId;
    }

    public void setCId(Customer cId) {
        this.cId = cId;
    }

    public Sport getSId() {
        return sId;
    }

    public void setSId(Sport sId) {
        this.sId = sId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (iId != null ? iId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Interesting)) {
            return false;
        }
        Interesting other = (Interesting) object;
        if ((this.iId == null && other.iId != null) || (this.iId != null && !this.iId.equals(other.iId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Interesting[ iId=" + iId + " ]";
    }
    
}
