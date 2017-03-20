/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.Serializable;
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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Spanp
 */
@Entity
@Table(name = "notify")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Notify.findAll", query = "SELECT n FROM Notify n")
    , @NamedQuery(name = "Notify.findByNId", query = "SELECT n FROM Notify n WHERE n.nId = :nId")
    , @NamedQuery(name = "Notify.findByContent", query = "SELECT n FROM Notify n WHERE n.content = :content")
    , @NamedQuery(name = "Notify.findByHaveRead", query = "SELECT n FROM Notify n WHERE n.haveRead = :haveRead")
    , @NamedQuery(name = "Notify.findByDateread", query = "SELECT n FROM Notify n WHERE n.dateread = :dateread")
    , @NamedQuery(name = "Notify.findByDatesent", query = "SELECT n FROM Notify n WHERE n.datesent = :datesent")})
public class Notify implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "n_id")
    private Integer nId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "content")
    private String content;
    @Basic(optional = false)
    @NotNull
    @Column(name = "have_read")
    private boolean haveRead;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateread")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateread;
    @Basic(optional = false)
    @NotNull
    @Column(name = "datesent")
    @Temporal(TemporalType.TIMESTAMP)
    private Date datesent;
    @JoinColumn(name = "from_user", referencedColumnName = "c_id")
    @ManyToOne(optional = false)
    private Customer fromUser;
    @JoinColumn(name = "to_user", referencedColumnName = "c_id")
    @ManyToOne(optional = false)
    private Customer toUser;
    @JoinColumn(name = "invite_to", referencedColumnName = "lb_id")
    @ManyToOne
    private Lobby inviteTo;

    public Notify() {
    }

    public Notify(Integer nId) {
        this.nId = nId;
    }

    public Notify(Integer nId, String content, boolean haveRead, Date dateread, Date datesent) {
        this.nId = nId;
        this.content = content;
        this.haveRead = haveRead;
        this.dateread = dateread;
        this.datesent = datesent;
    }

    public Integer getNId() {
        return nId;
    }

    public void setNId(Integer nId) {
        this.nId = nId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean getHaveRead() {
        return haveRead;
    }

    public void setHaveRead(boolean haveRead) {
        this.haveRead = haveRead;
    }

    public Date getDateread() {
        return dateread;
    }

    public void setDateread(Date dateread) {
        this.dateread = dateread;
    }

    public Date getDatesent() {
        return datesent;
    }

    public void setDatesent(Date datesent) {
        this.datesent = datesent;
    }

    public Customer getFromUser() {
        return fromUser;
    }

    public void setFromUser(Customer fromUser) {
        this.fromUser = fromUser;
    }

    public Customer getToUser() {
        return toUser;
    }

    public void setToUser(Customer toUser) {
        this.toUser = toUser;
    }

    public Lobby getInviteTo() {
        return inviteTo;
    }

    public void setInviteTo(Lobby inviteTo) {
        this.inviteTo = inviteTo;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (nId != null ? nId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Notify)) {
            return false;
        }
        Notify other = (Notify) object;
        if ((this.nId == null && other.nId != null) || (this.nId != null && !this.nId.equals(other.nId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Notify[ nId=" + nId + " ]";
    }
    
}
