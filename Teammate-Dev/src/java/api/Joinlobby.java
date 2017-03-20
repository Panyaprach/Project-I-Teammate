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
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Spanp
 */
@Entity
@Table(name = "joinlobby")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Joinlobby.findAll", query = "SELECT j FROM Joinlobby j")
    , @NamedQuery(name = "Joinlobby.findByJoinId", query = "SELECT j FROM Joinlobby j WHERE j.joinId = :joinId")
    , @NamedQuery(name = "Joinlobby.findByIsHead", query = "SELECT j FROM Joinlobby j WHERE j.isHead = :isHead")})
public class Joinlobby implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "join_id")
    private Integer joinId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "is_head")
    private boolean isHead;
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @ManyToOne(optional = false)
    private Customer cId;
    @JoinColumn(name = "lb_id", referencedColumnName = "lb_id")
    @ManyToOne(optional = false)
    private Lobby lbId;

    public Joinlobby() {
    }

    public Joinlobby(Integer joinId) {
        this.joinId = joinId;
    }

    public Joinlobby(Integer joinId, boolean isHead) {
        this.joinId = joinId;
        this.isHead = isHead;
    }

    public Integer getJoinId() {
        return joinId;
    }

    public void setJoinId(Integer joinId) {
        this.joinId = joinId;
    }

    public boolean getIsHead() {
        return isHead;
    }

    public void setIsHead(boolean isHead) {
        this.isHead = isHead;
    }

    public Customer getCId() {
        return cId;
    }

    public void setCId(Customer cId) {
        this.cId = cId;
    }

    public Lobby getLbId() {
        return lbId;
    }

    public void setLbId(Lobby lbId) {
        this.lbId = lbId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (joinId != null ? joinId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Joinlobby)) {
            return false;
        }
        Joinlobby other = (Joinlobby) object;
        if ((this.joinId == null && other.joinId != null) || (this.joinId != null && !this.joinId.equals(other.joinId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Joinlobby[ joinId=" + joinId + " ]";
    }
    
}
