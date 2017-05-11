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
@Table(name = "lobby")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Lobby.findAll", query = "SELECT l FROM Lobby l")
    , @NamedQuery(name = "Lobby.findByLbId", query = "SELECT l FROM Lobby l WHERE l.lbId = :lbId")
    , @NamedQuery(name = "Lobby.findByName", query = "SELECT l FROM Lobby l WHERE l.name = :name")
    , @NamedQuery(name = "Lobby.findByDescription", query = "SELECT l FROM Lobby l WHERE l.description = :description")
    , @NamedQuery(name = "Lobby.findByMaxMember", query = "SELECT l FROM Lobby l WHERE l.maxMember = :maxMember")})
public class Lobby implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "lb_id")
    private Integer lbId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;
    @Size(max = 255)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "max_member")
    private int maxMember;
    @Basic(optional = false)
    @Column(name = "start_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;
    @Basic(optional = false)
    @Column(name = "end_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;
    @JoinColumn(name = "sport", referencedColumnName = "s_id")
    @ManyToOne(optional = false)
    private Sport sport;
    @JoinColumn(name = "location", referencedColumnName = "lc_id")
    @ManyToOne
    private Location location;
    @JoinColumn(name = "chatroom", referencedColumnName = "con_id")
    @ManyToOne
    private Conversation chatroom;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "lbId")
    private Collection<Joinlobby> joinlobbyCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "lbId")
    private Collection<Conversation> conversationCollection;
    @OneToMany(mappedBy = "inviteTo")
    private Collection<Notify> notifyCollection;

    public Lobby() {
    }

    public Lobby(Integer lbId) {
        this.lbId = lbId;
    }

    public Lobby(Integer lbId, String name, int maxMember) {
        this.lbId = lbId;
        this.name = name;
        this.maxMember = maxMember;
    }

    public Integer getLbId() {
        return lbId;
    }

    public void setLbId(Integer lbId) {
        this.lbId = lbId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMaxMember() {
        return maxMember;
    }

    public void setMaxMember(int maxMember) {
        this.maxMember = maxMember;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Conversation getChatroom() {
        return chatroom;
    }

    public void setChatroom(Conversation chatroom) {
        this.chatroom = chatroom;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (lbId != null ? lbId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Lobby)) {
            return false;
        }
        Lobby other = (Lobby) object;
        if ((this.lbId == null && other.lbId != null) || (this.lbId != null && !this.lbId.equals(other.lbId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Lobby[ lbId=" + lbId + " ]";
    }
    
}
