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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Spanp
 */
@Entity
@Table(name = "advertise")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Advertise.findAll", query = "SELECT a FROM Advertise a")
    , @NamedQuery(name = "Advertise.findByAdsId", query = "SELECT a FROM Advertise a WHERE a.adsId = :adsId")
    , @NamedQuery(name = "Advertise.findByContent", query = "SELECT a FROM Advertise a WHERE a.content = :content")
    , @NamedQuery(name = "Advertise.findByDescription", query = "SELECT a FROM Advertise a WHERE a.description = :description")
    , @NamedQuery(name = "Advertise.findByGenerateDate", query = "SELECT a FROM Advertise a WHERE a.generateDate = :generateDate")})
public class Advertise implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ads_id")
    private Integer adsId;
    @Size(max = 250)
    @Column(name = "content")
    private String content;
    @Size(max = 250)
    @Column(name = "description")
    private String description;
    @Column(name = "generate_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date generateDate;
    @JoinColumn(name = "img_id", referencedColumnName = "img_id")
    @ManyToOne(optional = false)
    private Image imgId;

    public Advertise() {
    }

    public Advertise(Integer adsId) {
        this.adsId = adsId;
    }

    public Integer getAdsId() {
        return adsId;
    }

    public void setAdsId(Integer adsId) {
        this.adsId = adsId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getGenerateDate() {
        return generateDate;
    }

    public void setGenerateDate(Date generateDate) {
        this.generateDate = generateDate;
    }

    public Image getImgId() {
        return imgId;
    }

    public void setImgId(Image imgId) {
        this.imgId = imgId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (adsId != null ? adsId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Advertise)) {
            return false;
        }
        Advertise other = (Advertise) object;
        if ((this.adsId == null && other.adsId != null) || (this.adsId != null && !this.adsId.equals(other.adsId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.Advertise[ adsId=" + adsId + " ]";
    }
    
}
