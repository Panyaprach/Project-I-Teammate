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
@Table(name = "conversation")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Conversation.findAll", query = "SELECT c FROM Conversation c")
    , @NamedQuery(name = "Conversation.findByConId", query = "SELECT c FROM Conversation c WHERE c.conId = :conId")
    , @NamedQuery(name = "Conversation.findByContent", query = "SELECT c FROM Conversation c WHERE c.content = :content")
    , @NamedQuery(name = "Conversation.findByDatesent", query = "SELECT c FROM Conversation c WHERE c.datesent = :datesent")
    , @NamedQuery(name = "Conversation.findByLobbyID", query = "SELECT c FROM Conversation c WHERE c.lbId = (SELECT l FROM Lobby l WHERE l.lbId = :lbId)")})
public class Conversation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "con_id")
    private Integer conId;
    @Size(max = 255)
    @Column(name = "content")
    private String content;
    @Basic(optional = false)
    @NotNull
    @Column(name = "datesent")
    @Temporal(TemporalType.TIMESTAMP)
    private Date datesent;
    @OneToMany(mappedBy = "chatroom")
    private Collection<Lobby> lobbyCollection;
    @JoinColumn(name = "c_id", referencedColumnName = "c_id")
    @ManyToOne(optional = false)
    private Customer cId;
    @JoinColumn(name = "lb_id", referencedColumnName = "lb_id")
    @ManyToOne(optional = false)
    private Lobby lbId;

    public Conversation() {
    }

    public Conversation(Integer conId) {
        this.conId = conId;
    }

    public Conversation(Integer conId, Date datesent) {
        this.conId = conId;
        this.datesent = datesent;
    }

    public Integer getConId() {
        return conId;
    }

    public void setConId(Integer conId) {
        this.conId = conId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDatesent() {
        return datesent;
    }

    public void setDatesent(Date datesent) {
        this.datesent = datesent;
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

    public Lobby getLbId() {
        return lbId;
    }

    public void setLbId(Lobby lbId) {
        this.lbId = lbId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (conId != null ? conId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Conversation)) {
            return false;
        }
        Conversation other = (Conversation) object;
        if ((this.conId == null && other.conId != null) || (this.conId != null && !this.conId.equals(other.conId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Conversation[ conId=" + conId + " ]";
    }
    
}
